import {Component} from 'react'

export default class DigitalTimer extends Component {
  state = {present: 25, mins: 0, sec: 0, runningsec: 0, pcon: false, count: 0}

  clear = () => {
    console.log(this.id)
    clearInterval(this.id)
  }

  container = () => {
    const {runningsec, present, mins, sec, count} = this.state
    if (runningsec === 0 && count !== 0) {
      this.clear()
    } else if (count < 1) {
      console.log('first trigger entered')
      let msec = present * 60
      const presm = Math.floor(msec / 60)
      msec = msec - 1
      const presse = msec % 60
      this.setState(prev => ({
        runningsec: msec,
        mins: presm,
        sec: presse,
        count: 1,
      }))
      console.log(presse, msec, presm)
    } else {
      console.log('entered next triger')
      const msec = runningsec - 1
      const presm = Math.floor(msec / 60)
      const presse = msec % 60

      this.setState(prev => ({runningsec: msec, mins: presm, sec: presse}))
    }
  }

  res = () => {
    this.clear()
    this.setState(prev => ({
      present: 25,
      mins: 0,
      sec: 0,
      runningsec: 0,
      pcon: false,
      count: 0,
    }))
  }

  trig = () => {
    const func = () => {
      const {pcon} = this.state
      return !pcon
    }
    const {pcon} = this.state
    console.log('entered on clcik triger')
    const oncl = func()
    console.log(oncl)
    if (!pcon) {
      this.id = setInterval(() => {
        this.container()
      }, 1000)
    } else {
      this.clear()
    }
    this.setState(prev => ({pcon: !prev.pcon}))
  }

  contex = () => {
    const {present, mins, sec, runningsec, pcon, count} = this.state
    let mint = mins
    let sect = sec
    if (pcon || count !== 0) {
      console.log(runningsec)
      sect = sec > 9 ? sec : `0${sec}`
      mint = mins > 9 ? mins : `0${mins}`
    } else if (count === 0) {
      sect = '00'
      mint = present
    }
    const res = `${mint}:${sec}`
    return res
  }

  render() {
    const {present, mins, sec, runningsec, pcon, count} = this.state
    const prescodofbut = pcon ? 'Running' : 'Paused'
    const buttext = pcon ? 'Pause' : 'Start'
    return (
      <div>
        <p>{prescodofbut}</p>
        <h1>
          {this.contex()}
          {count}
        </h1>
        <button onClick={this.trig} className="btn btn-primary">
          {buttext}
        </button>
        <button className="btn btn-primary" onClick={this.res}>
          Reset
        </button>
      </div>
    )
  }
}
