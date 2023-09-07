import './index.css'

const AppointmentItem = props => {
  const {item, func} = props
  const {id, title, date, star} = item
  const imageUrl = star
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const changeUrl = () => {
    func(id)
  }

  return (
    <li className="itemCard">
      <div className="flex">
        <p className="name">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="starBtn"
          onClick={changeUrl}
        >
          <img src={imageUrl} alt="star" className="starImg" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
