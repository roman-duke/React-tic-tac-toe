import PropTypes from 'prop-types'

DifficultyIcon.propTypes = {
  colorOne: PropTypes.string.isRequired,
  colorTwo: PropTypes.string.isRequired,
}

export default function DifficultyIcon({colorOne, colorTwo}) {
  return (
    <svg id="lightning" viewBox="0 0 1024 1024" >
      <path d="M643.84 449.28l-243.2 435.2 76.8-332.8-102.4-12.8 230.4-448-76.8 345.6z" fill={colorOne} />
      <path d="M400.64 897.28c-1.28 0-2.56 0-5.12-1.28-6.4-2.56-8.96-8.96-7.68-15.36L462.08 563.2l-88.32-11.52c-3.84 0-7.68-2.56-10.24-6.4s-2.56-7.68 0-11.52l230.4-448c2.56-5.12 10.24-8.96 15.36-6.4 6.4 2.56 8.96 8.96 7.68 15.36l-74.24 331.52 101.12 11.52c3.84 0 7.68 2.56 10.24 6.4s1.28 8.96 0 11.52l-243.2 435.2c-1.28 3.84-5.12 6.4-10.24 6.4z m-6.4-368.64l84.48 10.24c3.84 0 6.4 2.56 8.96 5.12 2.56 2.56 2.56 6.4 2.56 10.24l-56.32 245.76 189.44-340.48-96-10.24c-3.84 0-6.4-2.56-8.96-5.12s-2.56-6.4-2.56-10.24l55.04-248.32-176.64 343.04z" fill={colorTwo} />
    </svg>
  )
}