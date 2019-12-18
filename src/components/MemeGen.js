import React, { useState, useEffect } from "react";
import axios from "axios";

function MemeGen() {
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [randomImg, setRandomImg] = useState("http://i.imgflip.com/1bij.jpg");
  const [allMemeImgs, setAllMemeImgs] = useState([]);

  useEffect(() => {
    axios.get("https://api.imgflip.com/get_memes").then(res => {
      setAllMemeImgs(res.data.data.memes);
    });
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    const randNum = Math.floor(Math.random() * allMemeImgs.length);
    const randMemeImg = allMemeImgs[randNum].url;

    setRandomImg(randMemeImg);
  }

  return (
    <div className="memetext">
      <form className="meme-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="topText"
          placeholder="Top Text"
          value={topText}
          onChange={e => setTopText(e.target.value)}
        />
        <input
          type="text"
          name="bottomText"
          placeholder="Bottom Text"
          value={bottomText}
          onChange={e => setBottomText(e.target.value)} // handlechange
        />
        <button>Make memes</button>
      </form>
      <div className="meme">
        <img src={randomImg} />
        <h2 className="top">{topText}</h2>
        <h2 className="bottom">{bottomText}</h2>
      </div>
    </div>
  );
}
export default MemeGen;
