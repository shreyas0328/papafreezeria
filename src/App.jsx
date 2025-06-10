import React, { useState, useEffect, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Text, Text3D, Center, useGLTF, Float } from '@react-three/drei'
import './App.css'

const CUSTOMERS = [
  { 
    id: 1,
    name: 'Mandi',
    cipherText: "Uif rvjdl cspxo gpy",
    answer: "fox",
    difficulty: 1
  },
  { 
    id: 2,
    name: 'Tony',
    cipherText: "Bsf zpv sfbez gps uif ofyu dibmmfohf?",
    answer: "ready",
    difficulty: 2
  },
  { 
    id: 3,
    name: 'Prudence',
    cipherText: "Dbo zpv tpmwf uijt djqifs?",
    answer: "solve",
    difficulty: 3
  },
  {
    id: 4,
    name: 'Cooper',
    cipherText: "Gzrtzyk nx ymj gjxy lfrj!",
    answer: "cipher",
    difficulty: 3
  },
  {
    id: 5,
    name: 'Penny',
    cipherText: "Nby mywlyn cm bupqus nblioab",
    answer: "halfway",
    difficulty: 4
  },
  {
    id: 6,
    name: 'Rico',
    cipherText: "Xlsks gkx dro locd myypso",
    answer: "these",
    difficulty: 2
  },
  {
    id: 7,
    name: 'Marty',
    cipherText: "Gsqfyx qiwweki jsv csy",
    answer: "secret",
    difficulty: 3
  },
  {
    id: 8,
    name: 'Clover',
    cipherText: "Qcaacih muugyjnyx",
    answer: "mission",
    difficulty: 4
  },
  {
    id: 9,
    name: 'Utah',
    cipherText: "Vkdw lv wkh sdvvzrug?",
    answer: "what",
    difficulty: 2
  },
  {
    id: 10,
    name: 'Robby',
    cipherText: "Frvpxwhu vflhqfh lv ixq!",
    answer: "computer",
    difficulty: 5
  }
]

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong with the 3D rendering.</div>
    }
    return this.props.children
  }
}

function Customer({ position, customerData, isLeaving }) {
  const groupRef = useRef()
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Add subtle floating animation
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1
    }
  })

  const skinColors = {
    Mandi: "#ffdbac",
    Tony: "#c68642",
    Prudence: "#e0ac69",
    Cooper: "#8d5524",
    Penny: "#ffd5b3",
    Rico: "#bb9167",
    Marty: "#e6b89c",
    Clover: "#ffe0bd",
    Utah: "#c68642",
    Robby: "#ae7343"
  }

  const hairColors = {
    Mandi: "#4a3000",
    Tony: "#1a1a1a",
    Prudence: "#cc0000",
    Cooper: "#663300",
    Penny: "#ffcc00",
    Rico: "#000000",
    Marty: "#4d2600",
    Clover: "#009933",
    Utah: "#996633",
    Robby: "#666666"
  }

  const clothingColors = {
    Mandi: "#ff69b4",
    Tony: "#2e2e2e",
    Prudence: "#4a90e2",
    Cooper: "#8b4513",
    Penny: "#9370db",
    Rico: "#ff4500",
    Marty: "#20b2aa",
    Clover: "#32cd32",
    Utah: "#daa520",
    Robby: "#4682b4"
  }

  return (
    <group ref={groupRef} position={position}>
      {/* Body */}
      <mesh castShadow>
        <capsuleGeometry args={[0.5, 1, 8, 16]} />
        <meshStandardMaterial color={clothingColors[customerData.name]} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color={skinColors[customerData.name]} />
      </mesh>

      {/* Hair */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.42, 32, 32]} />
        <meshStandardMaterial color={hairColors[customerData.name]} />
      </mesh>

      {/* Eyes */}
      <group position={[0, 1.2, 0.3]}>
        <mesh position={[-0.15, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        <mesh position={[0.15, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="white" />
        </mesh>
        {/* Pupils */}
        <mesh position={[-0.15, 0, 0.05]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
        <mesh position={[0.15, 0, 0.05]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshStandardMaterial color="black" />
        </mesh>
      </group>

      {/* Speech bubble */}
      <Float
        speed={2}
        rotationIntensity={0}
        floatIntensity={0.2}
        position={[0, 2.5, 0]}
      >
        <group>
          {/* Bubble background */}
          <mesh>
            <boxGeometry args={[4, 1.5, 0.1]} />
            <meshStandardMaterial color="white" metalness={0.2} roughness={0.1} />
          </mesh>
          
          {/* Bubble tail */}
          <mesh position={[0, -0.9, 0]}>
            <cylinderGeometry args={[0.2, 0, 0.4, 4]} rotation={[0, Math.PI/4, 0]} />
            <meshStandardMaterial color="white" metalness={0.2} roughness={0.1} />
          </mesh>

          {/* Cipher text */}
          <Text
            position={[0, 0.2, 0.06]}
            fontSize={0.25}
            maxWidth={3.5}
            textAlign="center"
            color="#2d3436"
            font="/fonts/Righteous-Regular.ttf"
            anchorY="middle"
          >
            {customerData.cipherText}
          </Text>

          {/* Customer name */}
          <Text
            position={[0, -0.3, 0.06]}
            fontSize={0.2}
            color="#636e72"
            font="/fonts/Righteous-Regular.ttf"
            anchorY="middle"
          >
            {customerData.name}
          </Text>
        </group>
      </Float>
    </group>
  )
}

function Blender({ position }) {
  return (
    <group position={position}>
      {/* Blender base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.4, 0.3, 16]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Blender jar */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.8, 16]} />
        <meshStandardMaterial color="#b8e994" transparent opacity={0.6} metalness={0.1} roughness={0.1} />
      </mesh>
      {/* Blender lid */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.28, 0.28, 0.1, 16]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}

function IceCreamCup({ position }) {
  return (
    <group position={position}>
      {/* Cup */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.15, 0.4, 16]} />
        <meshStandardMaterial color="#f5d6ba" metalness={0.1} roughness={0.8} />
      </mesh>
      {/* Ice cream */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#fff5e6" metalness={0.1} roughness={0.6} />
      </mesh>
      {/* Whipped cream */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <coneGeometry args={[0.15, 0.3, 16]} />
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.6} />
      </mesh>
      {/* Cherry */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial color="#ff4757" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  )
}

function ToppingsContainer({ position, color, label }) {
  return (
    <group position={position}>
      {/* Container */}
      <mesh castShadow>
        <boxGeometry args={[0.4, 0.3, 0.4]} />
        <meshStandardMaterial color="#34495e" metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Lid */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.42, 0.1, 0.42]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.7} />
      </mesh>
      {/* Label */}
      <Text
        position={[0, 0, 0.21]}
        fontSize={0.08}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  )
}

function SyrupBottle({ position, color }) {
  return (
    <group position={position}>
      {/* Bottle */}
      <mesh castShadow>
        <cylinderGeometry args={[0.1, 0.15, 0.5, 16]} />
        <meshStandardMaterial color={color} metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.05, 0.08, 0.1, 16]} />
        <meshStandardMaterial color="#2c3e50" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  )
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[20, 20]} />
      <meshStandardMaterial 
        color="#a0522d"
        metalness={0.2}
        roughness={0.8}
      />
    </mesh>
  )
}

function Counter() {
  return (
    <group position={[0, -1, 0]}>
      {/* Counter base */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[8, 2, 2]} />
        <meshStandardMaterial 
          color="#8b4513"
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>
      {/* Counter top */}
      <mesh position={[0, 1.1, 0]} castShadow receiveShadow>
        <boxGeometry args={[8.4, 0.2, 2.4]} />
        <meshStandardMaterial 
          color="#deb887"
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
      {/* Counter details */}
      <mesh position={[0, 0, 1.1]} castShadow>
        <boxGeometry args={[8, 1.8, 0.1]} />
        <meshStandardMaterial 
          color="#6d4c41"
          metalness={0.1}
          roughness={0.9}
        />
      </mesh>

      {/* Add Freezeria items */}
      <group position={[0, 1.2, 0]}>
        {/* Blenders */}
        <Blender position={[-3, 0, 0]} />
        <Blender position={[-2, 0, 0]} />
        
        {/* Sample drinks */}
        <IceCreamCup position={[2, 0, 0]} />
        <IceCreamCup position={[2.5, 0, 0.3]} />
        
        {/* Toppings containers */}
        <ToppingsContainer position={[-1, 0, 0]} color="#e84393" label="Sprinkles" />
        <ToppingsContainer position={[-0.5, 0, 0]} color="#ffeaa7" label="Nuts" />
        <ToppingsContainer position={[0, 0, 0]} color="#6c5ce7" label="Cookies" />
        
        {/* Syrup bottles */}
        <SyrupBottle position={[1, 0, -0.5]} color="#e17055" />
        <SyrupBottle position={[1.2, 0, -0.5]} color="#fdcb6e" />
        <SyrupBottle position={[1.4, 0, -0.5]} color="#00b894" />
      </group>
    </group>
  )
}

function Walls() {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 3, -5]} receiveShadow>
        <boxGeometry args={[20, 10, 0.3]} />
        <meshStandardMaterial 
          color="#87ceeb"
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      {/* Left wall */}
      <mesh position={[-10, 3, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 10, 0.3]} />
        <meshStandardMaterial 
          color="#87ceeb"
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      {/* Right wall */}
      <mesh position={[10, 3, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[10, 10, 0.3]} />
        <meshStandardMaterial 
          color="#87ceeb"
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>
      {/* Wall decorations */}
      <mesh position={[0, 4, -4.8]} receiveShadow>
        <boxGeometry args={[3, 2, 0.1]} />
        <meshStandardMaterial 
          color="#4a4a4a"
          metalness={0.3}
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}

function Scene({ currentCustomer, customerPosition, isLeaving }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[0, 4, 0]} intensity={0.5} />
      <Floor />
      <Counter />
      <Walls />
      {currentCustomer && (
        <Customer
          position={customerPosition}
          customerData={currentCustomer}
          isLeaving={isLeaving}
        />
      )}
    </>
  )
}

export default function App() {
  const [score, setScore] = useState(0)
  const [currentCustomer, setCurrentCustomer] = useState(null)
  const [customerPosition, setCustomerPosition] = useState([0, -0.5, -3]) // Customer appears in front of counter
  const [isLeaving, setIsLeaving] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [gameState, setGameState] = useState('waiting')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (!currentCustomer && gameState === 'waiting') {
      setTimeout(() => {
        const randomCustomer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)]
        setCurrentCustomer(randomCustomer)
        setGameState('entering')
        
        // Animate customer entering from far away
        let pos = -8
        const enterInterval = setInterval(() => {
          if (pos >= -3) {
            clearInterval(enterInterval)
            setGameState('serving')
          } else {
            pos += 0.2
            setCustomerPosition([0, -0.5, pos])
          }
        }, 50)
      }, 1500)
    }
  }, [currentCustomer, gameState])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (gameState !== 'serving') return

    if (userInput.toLowerCase() === currentCustomer.answer) {
      const points = currentCustomer.difficulty * 100
      setScore(prevScore => prevScore + points)
      setFeedback(`Correct! +${points} points`)
      setGameState('leaving')
      setIsLeaving(true)
      
      // Animate customer leaving
      let pos = -3
      const leaveInterval = setInterval(() => {
        if (pos <= -8) {
          clearInterval(leaveInterval)
          setCurrentCustomer(null)
          setUserInput('')
          setIsLeaving(false)
          setGameState('waiting')
          setCustomerPosition([0, -0.5, -3])
          setTimeout(() => setFeedback(''), 2000)
        } else {
          pos -= 0.2
          setCustomerPosition([0, -0.5, pos])
        }
      }, 50)
    } else {
      setFeedback('Try again!')
      const input = document.querySelector('.cipher-input')
      input.classList.add('shake')
      setTimeout(() => input.classList.remove('shake'), 500)
    }
  }

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className="game-ui">
        <h1>Papa's Cipher Shop</h1>
        <div className="score">Score: {score}</div>
      </div>
      {feedback && <div className="feedback">{feedback}</div>}
      <ErrorBoundary>
        <Canvas 
          shadows 
          camera={{ position: [0, 2, 3], fov: 75 }}
          gl={{ antialias: true }}
        >
          <Scene
            currentCustomer={currentCustomer}
            customerPosition={customerPosition}
            isLeaving={isLeaving}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            target={[0, 0.5, -2]}
          />
        </Canvas>
      </ErrorBoundary>
      <div className="input-section">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter the secret word..."
            className="cipher-input"
            disabled={gameState !== 'serving'}
          />
          <button 
            type="submit" 
            className="submit-btn"
            disabled={gameState !== 'serving'}
          >
            Submit Answer
          </button>
        </form>
      </div>
    </div>
  )
} 