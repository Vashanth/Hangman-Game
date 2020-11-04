import React, {Component} from 'react'
import './Hangman.css'
import movies from "../movies"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBomb, faBackward } from '@fortawesome/free-solid-svg-icons'

class Finder extends Component
{
    hasher = () => {
        let temp=this.state.movie
        let hashObj = {}
        for(var i=0;i<temp.length;i++)
        {
            if(temp[i]!==" ")
            {
                if(hashObj[temp[i]]===undefined)
                hashObj[temp[i]] = [i]
                else
                hashObj[temp[i]].push(i)
            }
        }
        this.setState({
            movieHash : hashObj
        })
    }

    selector = () => {
        let temp = ""
        while(temp.length < 5)
        temp = movies[parseInt(Math.random() * (1000))].toUpperCase()
        let ret = ""
        for(var i=0;i<temp.length;i++)
        {
            if(temp.match(/^[A-Z]*$/) || (temp[i]>=0 && temp[i]<=9) || (temp[i]==="'"||temp[i]===','||temp[i]==="?"))
            ret+=temp[i];
            else
            return this.selector()
        }
        return ret
    }

    initFinder = async() => {
        let movieSelect = this.selector()
        this.props.setMovie(movieSelect)

        await this.setState({
            movie : movieSelect
        })

        let htmlContent=""
        let temp = this.state.movie
        for(var i=0;i<temp.length;i++)
        {
            if(temp[i] === " ")
                htmlContent+="&nbsp";
            else
                htmlContent+=`<span id="dash${i}" style="font-size:50px"> _ </span>`;
        }
        document.getElementById("dashes").innerHTML = htmlContent

        htmlContent=""
        for(var i = "A".charCodeAt(0); i <= "Z".charCodeAt(0); i++)
        htmlContent+=`<button id="${String.fromCharCode(i)}">${String.fromCharCode(i)}</button>&nbsp;`
        htmlContent+="<br><br>"
        for(var i=0;i<10;i++)
        htmlContent+=`<button id="${i}">${i}</button>&nbsp;`
        htmlContent+=`<button id=",">,</button>&nbsp;`
        htmlContent+=`<button id="?">?</button>&nbsp;`
        htmlContent+=`<button id="'">'</button>&nbsp;`
        document.getElementById("keys").innerHTML = htmlContent

        this.hasher()
    }

    componentDidMount()
    {
        this.initFinder()
    }

    state = {
        movie:"",
        movieHash:{},
        hangmanIndex:0,
        usedBomb : false,
        usedRewind : false,
        induced : true
    }

    showChar = (key) => {
        let hashObj = this.state.movieHash
        let indexAr = hashObj[key]
        for(var x in indexAr)
        {
            let item = indexAr[x]
            document.getElementById(`dash${item}`).innerHTML = key
            document.getElementById(`dash${item}`).style.color = "white"
        }
        delete hashObj[key]
        this.setState({
            movieHash : hashObj
        })
        if(Object.keys(hashObj).length === 0)
        this.props.plugger("You Won!")
    }

    findAlpha = async (e) => {
        if(e.target.id.length>1)
        return

        if(this.state.movieHash[e.target.id] !== undefined)
        {
            this.showChar(e.target.id)
        }
        else
        {
            this.props.hangmanParts(this.state.hangmanIndex)
            await this.setState({hangmanIndex:this.state.hangmanIndex+1})
            if(this.state.induced)
            {
                this.setState({
                    usedBomb : true,
                    usedRewind : true,
                    induced : false
                })
                document.getElementById("bomb").style.opacity = 1
                document.getElementById("rewind").style.opacity = 1
            }
        }
        document.getElementById(e.target.id).style.display = "none"
    }

    reveal = () => {
        if(!this.state.usedBomb || this.state.hangmanIndex===0)
            return
        let keysAr = Object.keys(this.state.movieHash)
        let key = keysAr[Math.floor(Math.random() * keysAr.length)]
        this.showChar(key)
        this.setState({
            usedBomb : false
        })
        document.getElementById("bomb").style.opacity = 0.1
        document.getElementById(key).style.display = "none"
    }

    rewind = () => {
        if(!this.state.usedRewind || this.state.hangmanIndex===0)
            return
        this.props.rewinderFun(this.state.hangmanIndex-1)
        this.setState({
            usedRewind : false,
            hangmanIndex : this.state.hangmanIndex-1
        })
        document.getElementById("rewind").style.opacity = 0.1
        }

    playSound = audioFile => {
        audioFile.play();
    }

    render()
    {
        return(
            <center>
                <div class="container">
                    <button class="options" data-toggle="tooltip" title="Reveal 1 character" data-placement="top" id="bomb" onClick={this.reveal}><FontAwesomeIcon icon={faBomb} size="2x" color="maroon"/></button>
                    <button class="options" data-toggle="tooltip" title="Heal Hangman once" data-placement="top" id="rewind" onClick={this.rewind}><FontAwesomeIcon icon={faBackward} size="2x" color="black"/></button>
                    <div id="dashes"></div>
                </div>
                <div id="keys" onClick={this.findAlpha}></div>
            </center>
        )
    }
}

export default Finder