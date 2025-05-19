import React from "react";
import { Link } from "react-router-dom";
import {MoveRight} from "lucide-react";

function Banner() {
  return (
    <div className="banner">
       <h2>Amplie sua visão: veja mais projetos front end</h2>
        <Link to={`/projects`} className="btn">Ver Projetos <MoveRight /></Link>
    </div>
  );
}

export default Banner;