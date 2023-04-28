const About = () => (
  <div className="about">
    <h1>About</h1>
    <p>
      This project was developed as the course project of the Machine Learning
      2022-30 class of the Pontifical Xaverian University. The goals of this
      project are as follows:
    </p>
    <ul>
      <li>
        Use the{" "}
        <a href="https://www.kaggle.com/andradaolteanu/gtzan-dataset-music-genre-classification">
          GTZAN dataset
        </a>{" "}
        that contains 1000 audio files of 10 different genres (blues, classical,
        country, disco, hiphop, jazz, metal, pop, reggae, rock)
      </li>
      <li>
        Train three different machine learning models to classify the genre of a
        song based on its audio features (using the dataset)
      </li>
      <li>
        Create an user facing application that allows the user to upload an
        audio file and determine the genre of the song using the trained models
      </li>
    </ul>

    <h2>Authors</h2>
    <ul>
      <li>
        <a href="https://github.com/amoralesc">Alejandro Morales</a> is a
        Systems Engineering student at the Pontifical Xaverian University. He is
        currently completing his final year of studies.
      </li>
      <li>
        <a href="https://github.com/Sebas102507">Sebastián Vargas</a> is a
        Systems Engineering student at the Pontifical Xaverian University. He is
        currently completing his final year of studies.
      </li>
    </ul>
  </div>
);

export default About;
