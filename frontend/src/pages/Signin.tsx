import Qoute from '../components/Qoute'
import Infosigninbox from '../components/Infosigninbox'

function Signin() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
        <Infosigninbox />
        <Qoute />
    </div>
  )
}

export default Signin