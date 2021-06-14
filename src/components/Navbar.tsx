const Navbar = () => {
  return (
    <header className='navbar'>
      <a href="#" className='navbar__logo'>Sorting<br />Visualizer</a>
      <nav className='navbar__container'>
        <ul className='navbar__menu'>
          <li>Bubble Sort</li>
          <li>Selection Sort</li>
          <li>Insertion Sort</li>
          <li>Merge Sort</li>
          <li>Quick Sort</li>
          <li>Radix Sort</li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
