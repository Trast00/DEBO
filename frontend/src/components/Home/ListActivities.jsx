import React, { useEffect } from 'react'
import './activities.css'

const ListActivities = ({onGetData}) => {
  const [listActivities, setListActivities] = React.useState([])
  useEffect(() => {
    fetch('http://localhost:3000/industryTypes')
      .then(response => response.json())
      .then(data => {
        setListActivities(data)
        onGetData(data)
      })
  }, [])
  return (
    <>
      <ul class="list-activities">
        {listActivities.map(activity => (
          <li class="list-activities-item">
            <div class="activity">
              <div class="header d-none">
                <div class="img-wrapper">
                <svg width="36px" height="36px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#803D3B" stroke="#803D3B"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="var(--ci-primary-color, #803D3B)" d="M459.26,96,328,225.7V96H293.475L168,223.267V16H16V496H496V96ZM464,464H48V48h88V264h36.778L296,139.018V264h38.764L464,136.3Z" class="ci-primary"></path> <polygon fill="var(--ci-primary-color, #803D3B)" points="136 328 136 336 168 336 168 328 168 304 136 304 136 328" class="ci-primary"></polygon> <rect width="32" height="32" x="136" y="376" fill="var(--ci-primary-color, #803D3B)" class="ci-primary"></rect> <polygon fill="var(--ci-primary-color, #803D3B)" points="216 328 216 336 248 336 248 328 248 304 216 304 216 328" class="ci-primary"></polygon> <rect width="32" height="32" x="216" y="376" fill="var(--ci-primary-color, #803D3B)" class="ci-primary"></rect> <polygon fill="var(--ci-primary-color, #803D3B)" points="296 328 296 336 328 336 328 328 328 304 296 304 296 328" class="ci-primary"></polygon> <rect width="32" height="32" x="296" y="376" fill="var(--ci-primary-color, #803D3B)" class="ci-primary"></rect> <rect width="32" height="32" x="376" y="304" fill="var(--ci-primary-color, #803D3B)" class="ci-primary"></rect> <rect width="32" height="32" x="376" y="376" fill="var(--ci-primary-color, #803D3B)" class="ci-primary"></rect> </g></svg>
                </div>
                <div class="header-details details d-none">
                  <p><span class="svg-icon"></span> +51 marché en cours</p>
                  <p><span class="svg-icon"></span> +51 Entreprise cherchant des partenaires</p>
                </div>
              </div>
              <div class="content">
                <h3>
                  <span className='pb-1 px-1 d-none'><svg width="24px" height="24px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#803D3B" stroke="#803D3B"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill="var(--ci-primary-color, #803D3B)" d="M459.26,96,328,225.7V96H293.475L168,223.267V16H16V496H496V96ZM464,464H48V48h88V264h36.778L296,139.018V264h38.764L464,136.3Z" class="ci-primary"></path> <polygon fill="var(--ci-primary-color, #803D3B)" points="136 328 136 336 168 336 168 328 168 304 136 304 136 328" class="ci-primary"></polygon> <rect width="32" height="32" x="136" y="376" fill="var(--ci-primary-color, #803D3B)" class="ci-primary"></rect> <polygon fill="var(--ci-primary-color, #803D3B)" points="216 328 216 336 248 336 248 328 248 304 216 304 216 328" class="ci-primary"></polygon> <rect width="32" height="32" x="216" y="376" fill="var(--ci-primary-color, #803D3B)" class="ci-primary"></rect> <polygon fill="var(--ci-primary-color, #803D3B)" points="296 328 296 336 328 336 328 328 328 304 296 304 296 328" class="ci-primary"></polygon> <rect width="32" height="32" x="296" y="376" fill="var(--ci-primary-color, #803D3B)" class="ci-primary"></rect> <rect width="32" height="32" x="376" y="304" fill="var(--ci-primary-color, #803D3B)" class="ci-primary"></rect> <rect width="32" height="32" x="376" y="376" fill="var(--ci-primary-color, #803D3B)" class="ci-primary"></rect> </g></svg></span>
                  {activity.name}</h3>
                <p>{activity.description}</p>
              </div>
            </div>
          </li>
          ))}
      </ul>
    </>
  )
}

export default ListActivities