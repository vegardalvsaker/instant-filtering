import React, { useState, useEffect } from "react";
import usePeople from "./usePeople";
import { Person } from "./Person";

const App: React.FC = () => {
  const [inputvalue, setInputValue] = useState<string>("");
  const [suggestedSearchResult, setSuggestedSearchResult] = useState<
    Person[]
  >();
  const people = usePeople();

  /**
   * Updates the displayed name list based on the search input.
   * Displays all names if no search word has been given
   * @param {string} name
   * The user's input
   */
  const findSuggestedPeople = (name: string): void => {
    if (name.length === 0) {
      setSuggestedSearchResult(people);
      return;
    }
    const regExp = new RegExp(`(${name})`, "gi");
    const suggestions = people.filter(p => regExp.test(p.name));

    setSuggestedSearchResult(suggestions);
  };

  useEffect(() => {
    setSuggestedSearchResult(people);
  }, [people]);

  return (
    <>
      <input
        type="text"
        placeholder="Person name..."
        value={inputvalue}
        maxLength={20}
        onChange={e => {
          findSuggestedPeople(e.target.value);
          setInputValue(e.target.value);
        }}
      ></input>
      <div>
        {suggestedSearchResult
          ? suggestedSearchResult.map(p => <h1>{p.name}</h1>)
          : null}
      </div>
    </>
  );
};

export default App;
