import React from 'react'

function Checkbox({completed}){
  console.log(completed)
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="68" height="68" viewBox="0 0 68 68">
      <g id="Group_69" data-name="Group 69" transform="translate(-580 -1070)">
        <g id="Rectangle_25" data-name="Rectangle 25" transform="translate(580 1070)" fill="none" stroke="#707070" stroke-width="1">
          <rect width="68" height="68" rx="10" stroke="none"/>
          <rect x="0.5" y="0.5" width="67" height="67" rx="9.5" fill="none"/>
        </g>
        <g style={{opacity:completed ? '1' : '0'}} id="Group_68" data-name="Group 68" transform="translate(76 3)">
          <line id="Line_6" data-name="Line 6" y1="47" x2="47" transform="translate(514.5 1077.5)" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="1"/>
          <line id="Line_7" data-name="Line 7" x2="47" y2="47" transform="translate(514.5 1077.5)" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="1"/>
        </g>
      </g>
    </svg>
  )
}

export default Checkbox