import Card from '@mui/material/Card';
import TempVHumidityGraph from './temp-v-humidity-demo';

function App() {

  return (
    <>
    <p>My own text</p>
      <Card
        sx={{
          position: 'relative',
          color: "#E0E1E2",
          margin: '20px',
          width: '593px',
          height: '312px',
          padding: '45px',
          background: `linear-gradient(to bottom right, #272934, #161923)`,
        }}
      >
        <TempVHumidityGraph/>
      </Card>
    </>
  )
}

export default App
