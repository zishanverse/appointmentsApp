import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', list: [], isstar: false}

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeDate = event => {
    this.setState({date: event.target.value})
  }

  addItem = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const item = {
      id: uuidv4(),
      title,
      date: newDate,
      star: false,
    }

    this.setState(pre => ({list: [...pre.list, item], title: '', date: ''}))
  }

  star = id => {
    this.setState(pre => ({
      list: pre.list.map(each => {
        if (each.id === id) {
          return {...each, star: !each.star}
        }
        return each
      }),
    }))
  }

  starredList = () =>
    this.setState(pre => ({
      isstar: !pre.isstar,
    }))

  render() {
    const {list, isstar, title, date} = this.state
    let final
    const style = isstar ? 'active' : ''
    if (isstar) {
      final = list.filter(each => each.star === true)
    } else {
      final = list
    }

    return (
      <div className="container">
        <div className="card">
          <div className="addAppointment">
            <form>
              <div className="content">
                <h1 className="heading">Add Appointments</h1>

                <label htmlFor="title" className="inputLabel">
                  TITLE
                </label>
                <input
                  type="text"
                  id="title"
                  className="input"
                  onChange={this.changeTitle}
                  value={title}
                  placeholder="Title"
                />
                <label htmlFor="calender" className="inputLabel">
                  DATE
                </label>
                <input
                  type="date"
                  className="input"
                  id="calender"
                  onChange={this.changeDate}
                  value={date}
                />
                <button type="button" className="btn" onClick={this.addItem}>
                  Add
                </button>
              </div>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="img"
            />
          </div>
          <hr className="line" />
          <div className="flex">
            <p className="appointments">Appointments</p>
            <button
              className={`starred ${style}`}
              type="button"
              onClick={this.starredList}
            >
              Starred
            </button>
          </div>
          <ul className="list">
            {final.map(each => (
              <AppointmentItem item={each} key={each.id} func={this.star} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
