import { useEffect, useState } from "react";
import { peopleArray } from "./people-data";
import { Person } from "./Person";

export default () => {
  const [people, setPeople] = useState<Person[]>([]);

  const fetchPeople = () => {
    setPeople(peopleArray);
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return people;
};
