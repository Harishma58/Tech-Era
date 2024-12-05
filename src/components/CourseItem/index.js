import {Link} from 'react-router-dom'
import './index.css'

const CourseItem = props => {
  const {coursesDetails} = props
  const {id, name, logoUrl} = coursesDetails
  return (
    <Link to={`/courses/${id}`} className="link">
      <li className="list-item">
        <img src={logoUrl} className="icons" alt={name} />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}
export default CourseItem
