import * as THREE from 'three'

// Firework particle class
class Particle {
  constructor(position, velocity, color, size, life) {
    this.position = position.clone()
    this.velocity = velocity.clone()
    this.color = color
    this.size = size
    this.life = life
    this.maxLife = life
    this.gravity = -0.0012
    this.drag = 0.99
  }

  update() {
    this.velocity.y += this.gravity
    this.velocity.multiplyScalar(this.drag)
    this.position.add(this.velocity)
    this.life -= 1
    return this.life > 0
  }

  get alpha() {
    return Math.max(0, this.life / this.maxLife)
  }
}

// Spark particle - tiny fast particles
class SparkParticle extends Particle {
  constructor(position, baseVelocity, color) {
    const velocity = baseVelocity.clone().add(new THREE.Vector3(
      (Math.random() - 0.5) * 0.008,
      (Math.random() - 0.5) * 0.008,
      (Math.random() - 0.5) * 0.008
    ))
    super(position, velocity, color, 1.5 + Math.random(), 40 + Math.random() * 30)
    this.gravity = -0.0008
    this.drag = 0.98
  }
}

// Trail particle for launch phase
class TrailParticle extends Particle {
  constructor(position, color) {
    const velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.008,
      -Math.random() * 0.015 - 0.005,
      (Math.random() - 0.5) * 0.008
    )
    super(position, velocity, color, 2, 25)
    this.gravity = -0.0008
    this.drag = 0.94
  }
}

// Single firework
export class Firework {
  constructor(x, color, secondaryColor, onExplode) {
    this.position = new THREE.Vector3(x, -1.2, 0)
    this.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 0.012,
      0.032 + Math.random() * 0.01,
      0
    )
    this.color = new THREE.Color(color)
    this.secondaryColor = new THREE.Color(secondaryColor)
    this.exploded = false
    this.particles = []
    this.trailParticles = []
    this.sparkParticles = []
    this.targetY = 0.25 + Math.random() * 0.45
    this.onExplode = onExplode
    this.dead = false
  }

  update() {
    if (!this.exploded) {
      // Launch phase
      this.position.add(this.velocity)
      this.velocity.y -= 0.00035

      // Add trail sparks
      if (Math.random() > 0.3) {
        this.trailParticles.push(new TrailParticle(this.position, this.color))
      }

      // Check if should explode - wait until nearly stopped
      if (this.velocity.y <= 0.003 || this.position.y >= this.targetY) {
        this.explode()
      }
    }

    // Update all particles
    this.trailParticles = this.trailParticles.filter(p => p.update())
    this.particles = this.particles.filter(p => p.update())
    this.sparkParticles = this.sparkParticles.filter(p => p.update())

    // Check if completely dead
    if (this.exploded &&
        this.particles.length === 0 &&
        this.trailParticles.length === 0 &&
        this.sparkParticles.length === 0) {
      this.dead = true
    }
  }

  explode() {
    this.exploded = true
    if (this.onExplode) this.onExplode()

    const patterns = ['chrysanthemum', 'peony', 'willow', 'palm', 'ring']
    const pattern = patterns[Math.floor(Math.random() * patterns.length)]

    // Main particles
    const particleCount = 120 + Math.floor(Math.random() * 60)

    for (let i = 0; i < particleCount; i++) {
      let velocity
      const baseSpeed = 0.014 + Math.random() * 0.01
      const speedVariation = 0.7 + Math.random() * 0.6

      switch (pattern) {
        case 'ring': {
          const angle = (i / particleCount) * Math.PI * 2
          const ringSpeed = baseSpeed * 1.1
          velocity = new THREE.Vector3(
            Math.cos(angle) * ringSpeed * speedVariation,
            Math.sin(angle) * ringSpeed * speedVariation * 0.6 + 0.005,
            Math.sin(angle * 2) * ringSpeed * 0.2
          )
          break
        }
        case 'willow': {
          const angle = Math.random() * Math.PI * 2
          const upward = Math.random() * 0.3
          velocity = new THREE.Vector3(
            Math.cos(angle) * baseSpeed * 0.7 * speedVariation,
            baseSpeed * 0.4 * speedVariation + upward * 0.01,
            Math.sin(angle) * baseSpeed * 0.3 * speedVariation
          )
          break
        }
        case 'palm': {
          const angle = Math.random() * Math.PI * 2
          const elevation = Math.random() * 0.8 + 0.2
          velocity = new THREE.Vector3(
            Math.cos(angle) * baseSpeed * speedVariation * (1 - elevation * 0.5),
            baseSpeed * elevation * speedVariation,
            Math.sin(angle) * baseSpeed * 0.4 * speedVariation
          )
          break
        }
        case 'peony': {
          // Dense spherical burst
          const phi = Math.acos(2 * Math.random() - 1)
          const theta = Math.random() * Math.PI * 2
          const speed = baseSpeed * speedVariation
          velocity = new THREE.Vector3(
            Math.sin(phi) * Math.cos(theta) * speed,
            Math.sin(phi) * Math.sin(theta) * speed,
            Math.cos(phi) * speed * 0.5
          )
          break
        }
        default: // chrysanthemum - long trailing
          const phi2 = Math.acos(2 * Math.random() - 1)
          const theta2 = Math.random() * Math.PI * 2
          const speed2 = baseSpeed * speedVariation * 1.2
          velocity = new THREE.Vector3(
            Math.sin(phi2) * Math.cos(theta2) * speed2,
            Math.sin(phi2) * Math.sin(theta2) * speed2 + 0.003,
            Math.cos(phi2) * speed2 * 0.4
          )
      }

      // Color selection - mix primary and secondary
      const colorMix = Math.random()
      let particleColor
      if (colorMix < 0.6) {
        particleColor = this.color
      } else if (colorMix < 0.85) {
        particleColor = this.secondaryColor
      } else {
        // White sparkle
        particleColor = new THREE.Color(0xffffff)
      }

      const size = 1.5 + Math.random() * 2
      const life = pattern === 'willow' ? 140 + Math.random() * 60 : 90 + Math.random() * 50

      this.particles.push(new Particle(
        this.position,
        velocity,
        particleColor,
        size,
        life
      ))

      // Add sparks trailing from main particles
      if (Math.random() > 0.7) {
        this.sparkParticles.push(new SparkParticle(this.position, velocity, particleColor))
      }
    }

    // Add extra center sparks
    for (let i = 0; i < 30; i++) {
      const sparkVel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.025,
        (Math.random() - 0.5) * 0.025,
        (Math.random() - 0.5) * 0.015
      )
      this.sparkParticles.push(new SparkParticle(this.position, sparkVel, new THREE.Color(0xffffff)))
    }
  }

  getPoints() {
    const positions = []
    const colors = []
    const sizes = []

    // Trail particles
    for (const p of this.trailParticles) {
      positions.push(p.position.x, p.position.y, p.position.z)
      const a = p.alpha * 0.8
      colors.push(p.color.r * a, p.color.g * a, p.color.b * a)
      sizes.push(p.size * (0.3 + p.alpha * 0.7))
    }

    // Launch point (if not exploded)
    if (!this.exploded) {
      positions.push(this.position.x, this.position.y, this.position.z)
      colors.push(this.color.r, this.color.g, this.color.b)
      sizes.push(3)
    }

    // Main explosion particles
    for (const p of this.particles) {
      positions.push(p.position.x, p.position.y, p.position.z)
      const a = p.alpha
      colors.push(p.color.r * a, p.color.g * a, p.color.b * a)
      sizes.push(p.size * (0.4 + a * 0.6))
    }

    // Spark particles
    for (const p of this.sparkParticles) {
      positions.push(p.position.x, p.position.y, p.position.z)
      const a = p.alpha
      colors.push(p.color.r * a, p.color.g * a, p.color.b * a)
      sizes.push(p.size * a)
    }

    return { positions, colors, sizes }
  }
}

// Firework manager
export class FireworkSystem {
  constructor(scene) {
    this.scene = scene
    this.fireworks = []

    // Create particle geometry
    this.geometry = new THREE.BufferGeometry()
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute([], 3))
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute([], 3))
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute([], 1))

    // Particle material - sharper, more point-like
    this.material = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (250.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center) * 2.0;

          // Sharp bright core with soft glow
          float core = 1.0 - smoothstep(0.0, 0.3, dist);
          float glow = 1.0 - smoothstep(0.0, 1.0, dist);
          glow = pow(glow, 2.0);

          float alpha = core * 0.9 + glow * 0.4;

          // Brighten the center
          vec3 col = vColor + vec3(core * 0.3);

          gl_FragColor = vec4(col, alpha);
        }
      `,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      vertexColors: true
    })

    this.points = new THREE.Points(this.geometry, this.material)
    this.scene.add(this.points)
  }

  launch(x, primaryColor, secondaryColor, onExplode) {
    const firework = new Firework(x, primaryColor, secondaryColor, onExplode)
    this.fireworks.push(firework)
    return firework
  }

  launchRandom() {
    const x = (Math.random() - 0.5) * 2
    const hue = Math.random()
    const color = new THREE.Color().setHSL(hue, 0.9, 0.55)
    const secondary = new THREE.Color().setHSL((hue + 0.08) % 1, 0.85, 0.6)
    this.launch(x, color.getHex(), secondary.getHex())
  }

  update() {
    // Update all fireworks
    this.fireworks = this.fireworks.filter(f => {
      f.update()
      return !f.dead
    })

    // Collect all particle data
    const allPositions = []
    const allColors = []
    const allSizes = []

    for (const firework of this.fireworks) {
      const { positions, colors, sizes } = firework.getPoints()
      allPositions.push(...positions)
      allColors.push(...colors)
      allSizes.push(...sizes)
    }

    // Update geometry
    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(allPositions, 3))
    this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(allColors, 3))
    this.geometry.setAttribute('size', new THREE.Float32BufferAttribute(allSizes, 1))
  }

  // Celebration mode - continuous random fireworks
  startCelebration(intensity = 1) {
    this.celebrationInterval = setInterval(() => {
      // Only launch on the left side to keep right side readable
      const x = -0.6 - Math.random() * 0.6
      const hue = Math.random()
      const color = new THREE.Color().setHSL(hue, 0.9, 0.55)
      const secondary = new THREE.Color().setHSL((hue + 0.08) % 1, 0.85, 0.6)
      this.launch(x, color.getHex(), secondary.getHex())
    }, 1200 / intensity)
  }

  stopCelebration() {
    if (this.celebrationInterval) {
      clearInterval(this.celebrationInterval)
      this.celebrationInterval = null
    }
  }
}
