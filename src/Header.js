import React from 'react';

const Header = (props) => {
  const headerStyle = {
    backgroundColor : "mediumblue",
    color : "white"
  }
  return (
    <header style={headerStyle}>
        <h1>{props.title}</h1>
    </header>
  )
}

Header.defaultProps = {
  title : "Todo list"
}

export default Header