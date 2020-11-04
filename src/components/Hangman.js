import React, {Component} from 'react'
import './Hangman.css'
import Finder from "./Finder"
import Modal from "./Modal"
import win from "../sounds/Winning-sound-effect.mp3";
import lose from "../sounds/Wrong-answer-sound-effect.mp3"
const winAudio = new Audio(win);
const loseAudio = new Audio(lose)

class Hangman extends Component
{
    state = {
        visiblility : [false, false, false, false, false, false, false],
        movieStore : "",
        pullThePlug : false,
        desc:""
    }

    setMovie = (movieStore) => {
        this.setState({movieStore})
    }

    hangmanParts = (index) => {
        let dupAr = this.state.visiblility
        dupAr[index] = true
        this.setState({
            visiblility : dupAr
        })
        if(index===5)
        this.plugger(`The Movie is ${this.state.movieStore}`)
    }

    rewinderFun = (index) => {
        let visibleTemp = this.state.visiblility
        visibleTemp[index] = false
        this.setState({
            visiblility : visibleTemp
        })
    }

    plugger = (desc) => {
        this.setState({
            pullThePlug : true
        })
        this.setState({desc})
        if(desc === "You Won!")
        this.playWin(winAudio)
        else
        this.playWin(loseAudio)
    }

    playWin = audioFile => {
        audioFile.play();
    }

    render()
    {
        return(
            <div class="container">
                <center>
                <svg height="350" width="300" class="figure-container">
                    <line x1="20" y1="320" x2="150" y2="320" />
                    <line x1="85" y1="320" x2="85" y2="20" />
                    <line x1="85" y1="20" x2="250" y2="20" />
                    <line x1="250" y1="50" x2="250" y2="20" />
                    {this.state.visiblility[0] && <circle cx="250" cy="80" r="30"/>}
                    {this.state.visiblility[1] && <line x1="250" y1="110" x2="250" y2="200" />}
                    {this.state.visiblility[2] && <line x1="250" y1="150" x2="210" y2="110" />}
                    {this.state.visiblility[3] && <line x1="250" y1="150" x2="290" y2="110" />}
                    {this.state.visiblility[4] && <line x1="250" y1="200" x2="210" y2="250" />}
                    {this.state.visiblility[5] && <line x1="250" y1="200" x2="290" y2="250" />}
                </svg>
                </center>
                <Finder 
                hangmanParts={this.hangmanParts} 
                rewinderFun={this.rewinderFun} 
                plugger={this.plugger}
                setMovie={this.setMovie}/>
                {this.state.pullThePlug && <Modal desc={this.state.desc}/>}
            </div>
        )
    }
}

export default Hangman