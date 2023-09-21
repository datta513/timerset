import {Component} from 'react'
import './index.css'

export default class DigitalTimer extends Component {
  state = {
    present: 25,
    mins: 0,
    sec: 0,
    runningsec: 0,
    pcon: false,
    count: 0,
    sc: 0,
  }

  clear = () => {
    console.log(this.id)
    clearInterval(this.id)
    this.setState(prev => ({pcon: false}))
  }

  runningsecc = () => {
    const {present} = this.state
  }

  container = () => {
    const {runningsec, present, mins, sec, count} = this.state
    if (runningsec === 0 && count !== 1) {
      this.setState(prev => ({runningsec: present * 60, count: 1}))
    } else if (runningsec === 0) {
      this.clear()
    } else {
      const msec = runningsec - 1
      const mints = Math.floor(msec / 60)
      const setc = Math.floor(msec % 60)
      this.setState(prev => ({runningsec: msec, mins: mints, sec: setc}))
    }
  }

  res = () => {
    this.clear()
    this.setState(prev => ({
      mins: 0,
      sec: 0,
      runningsec: 0,
      pcon: false,
      count: 0,
    }))
  }

  trig = () => {
    this.setState(prev => ({pcon: !prev.pcon}))
    const func = () => {
      const {pcon} = this.state
      console.log(pcon)
      return !pcon
    }
    const {pcon} = this.state
    console.log('entered on clcik triger')
    const oncl = func()
    console.log(oncl)
    if (oncl) {
      this.id = setInterval(() => {
        this.container()
      }, 1000)
    } else {
      this.clear()
    }
  }

  contex = () => {
    const {present, mins, sec, runningsec, pcon, count} = this.state
    let mint = mins
    let sect = sec
    if (sec !== 0) {
      console.log(runningsec)
      console.log(`entered non temp min ${mins},sec ${sec}`)
      sect = sec > 9 ? sec : `0${sec}`
      mint = mins > 9 ? mins : `0${mins}`
    } else if (count === 1) {
      sect = '00'
      mint = Math.floor(runningsec / 60)
    } else {
      sect = '00'
      mint = present
    }
    console.log(mint, sect)
    const res = `${mint}:${sect}`
    return res
  }

  inc = () => {
    this.setState(prev => ({present: prev.present + 1}))
  }

  dec = () => {
    const min = 0
    this.setState(prev => ({
      present: min < prev.present - 1 ? prev.present - 1 : 0,
    }))
  }

  render() {
    const {present, mins, sec, runningsec, pcon, count, sc} = this.state
    console.log(`sepcode ${sc}, min ${mins},sec ${sec}`)
    const prescodofbut = pcon ? 'Running' : 'Paused'
    const buttext = pcon ? 'Pause' : 'Start'
    const ur = pcon
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const alu = pcon ? 'pause icon' : ' play icon'
    return (
      <div className="main">
        <h1>Digital Timer</h1>
        <div className="Divi">
          <div className="back">
            <div className="dispcon">
              <h1>{this.contex()}</h1>
              <p>{prescodofbut}</p>
            </div>
          </div>
          <div className="buttonstyle1">
            <div className="buttonstyle">
              <button onClick={this.trig} className="buttonstyle">
                <img src={ur} alt={alu} /> <h1>{buttext}</h1>
              </button>
              <button
                className="btn btn-primary buttonstyle"
                onClick={this.res}
              >
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                />
                <h1>Reset</h1>
              </button>
            </div>
            <p>Set Timer limit</p>
            <div className="buttonstyle">
              <button type="button" onClick={this.inc}>
                <h1>+</h1>
              </button>
              <div className="c">
                <p>{present}</p>
              </div>
              <button onClick={this.dec}>
                <h1>-</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
