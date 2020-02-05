import React, { useState, useEffect } from "react";
import { AppConfig } from "../../config";
const _ = require("lodash");

const CatOwner = () => {
  const [maleOwnerCats, setMaleOwnerCats] = useState([]);
  const [femaleOwnerCats, setfeMaleOwnerCats] = useState([]);

  function getCatNameList(data: any) {
    return _.chain(data)
      .map("pets")
      .flatten()
      .filter({ type: "Cat" })
      .map("name")
      .sortBy(["name"])
      .value();
  }
  
  useEffect(() => {
  async function fetchData() {
    const apiEndPoint = AppConfig.apiUrl;
    const response = await fetch(apiEndPoint);
    const data = await response.json();
    const maleData = _.filter(data, function(o: any) {
      return o.gender.toLowerCase() === "male" && o.pets !== null;
    });
    const femaleData = _.filter(data, function(o: any) {
      return o.gender.toLowerCase() === "female" && o.pets !== null;
    });

    let femaleDataRes: any = getCatNameList(femaleData);

    let maleDataRes: any = getCatNameList(maleData);

    setMaleOwnerCats(maleDataRes);
    setfeMaleOwnerCats(femaleDataRes);
  }


    fetchData();
  }, []);

  return (
    <div>
    {maleOwnerCats ? (
      <div id="maleOwners"><h2> Male</h2>
      <ul>{maleOwnerCats && maleOwnerCats.map((catName: string, index) => <li key={index}>{catName}</li>)}</ul>
      </div>
    ) : <p>no cats for male owners</p>
    } 
    {femaleOwnerCats ? (
     <div id="femaleOwners">
      <h2>Female</h2>
      <ul>{femaleOwnerCats && femaleOwnerCats.map((catName: string, index) => <li key={index}>{catName}</li>)}</ul>
    </div>
    ) : <p>no cats for female owners</p> 
    }
    </div>
  );
};
export default CatOwner;
