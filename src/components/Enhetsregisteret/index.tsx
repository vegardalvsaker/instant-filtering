import React, { useState, useEffect } from 'react'
import styles from './styles.module.css'

const Enhetsregisteret: React.FC = () => {
    const [organisations, setOrganisations] = useState<Unit[]>([])
    const [input, setInput] = useState<string>('')
    const { orgs, isFetching, fetchOrgs } = useOrgs()

    useEffect(() => {
        if (input.length > 0) {
            fetchOrgs(input)
        } else {
            setOrganisations([])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input])

    useEffect(() => {
        setOrganisations(orgs)
    }, [orgs])

    return (
        <div className={styles.container}>
            <h1>Enhetsregisteret-søk</h1>
            <input
                type="text"
                onChange={(e) => setInput(e.target.value)}
                value={input}
            ></input>
            {organisations
                ? organisations.map((o) => (
                      <div key={o.organisasjonsnummer}>
                          <span>{o.navn}</span>
                      </div>
                  ))
                : null}
            <p>{isFetching ? 'Loading...' : null}</p>
        </div>
    )
}

export default Enhetsregisteret

const useOrgs = () => {
    const [orgs, setOrgs] = useState<Unit[]>([])
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [shouldFetch, setShouldFetch] = useState<boolean>(false)
    const [query, setQuery] = useState<string>('')
    const [abortController, setAbortController] = useState<AbortController>(
        new AbortController()
    )

    const fetchOrgs = async (queryParam: string) => {
        setQuery(queryParam)
        if (isFetching) {
            console.log('aborting')
            abortController.abort()
        }
        try {
            setIsFetching(true)
            const response = await fetch(
                `https://data.brreg.no/enhetsregisteret/api/enheter?navn=${queryParam}`,
                { signal: abortController.signal }
            )
            const result = (await response.json()) as Units
            setOrgs(result._embedded.enheter)
        } catch (ex) {
            setIsFetching(false)
            setShouldFetch(true)
            setAbortController(new AbortController())
        }
        setIsFetching(false)
    }

    useEffect(() => {
        //Avoid running this on first render
        if (!shouldFetch) console.log('first render')
        if (shouldFetch) {
            fetchOrgs(query)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [abortController])

    return { orgs, isFetching, fetchOrgs }
}

type Units = {
    _embedded: {
        enheter: Unit[]
    }
}

type Unit = {
    organisasjonsnummer: string
    navn: string
    organisasjonsform: {
        kode: string
        beskrivelse: string
    }
    naeringskode1: {
        beskrivelse: string
    }
}
