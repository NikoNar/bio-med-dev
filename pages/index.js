import React from 'react';
import {useTranslation} from "next-i18next";
import {analyzesUrl, newsUrl} from "../utils/url";
import AnalyzesSlider from "../components/AnalyzesSlider/AnalyzesSlider";

const Home = (analyzes) => {

    return (
      <>
        <h1>Home</h1>
          <AnalyzesSlider analyzes={analyzes}/>
      </>
  );
};

export async function getStaticProps() {
    const analyzes = await fetch(analyzesUrl)
        .then(res => res.json())
        .then(data => data)
    return {
        props: {analyzes},
    }
}


export default Home;

