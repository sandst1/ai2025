import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FireworkSystem } from './fireworks.js'
import { timelineData, companyColors } from './data.js'

gsap.registerPlugin(ScrollTrigger)

// DOM Elements
const canvas = document.getElementById('fireworks-canvas')
const header = document.getElementById('header')
const progressNav = document.getElementById('progress-nav')
const timelineContent = document.getElementById('timeline-content')
const countdownSection = document.getElementById('countdown-section')
const countdownTimer = document.getElementById('countdown-timer')
const finaleSection = document.getElementById('finale-section')

// Three.js setup
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 1.5

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(0x000510, 1)

// Stars background
function createStars() {
  const starCount = 400
  const positions = new Float32Array(starCount * 3)
  const sizes = new Float32Array(starCount)

  for (let i = 0; i < starCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] = (Math.random() - 0.5) * 10
    positions[i * 3 + 2] = -Math.random() * 5
    sizes[i] = Math.random() * 2 + 0.5
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

  const material = new THREE.ShaderMaterial({
    uniforms: { time: { value: 0 } },
    vertexShader: `
      attribute float size;
      uniform float time;
      varying float vAlpha;
      void main() {
        vAlpha = 0.3 + 0.7 * (0.5 + 0.5 * sin(time * 2.0 + position.x * 10.0));
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (100.0 / -mvPosition.z);
        gl_Position = projectionMatrix * mvPosition;
      }
    `,
    fragmentShader: `
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5) * 2.0;
        float alpha = (1.0 - smoothstep(0.0, 1.0, d)) * vAlpha;
        gl_FragColor = vec4(1.0, 1.0, 1.0, alpha);
      }
    `,
    transparent: true,
    depthTest: false
  })

  return { mesh: new THREE.Points(geometry, material), material }
}

const stars = createStars()
scene.add(stars.mesh)

// Firework system
const fireworkSystem = new FireworkSystem(scene)

// State
let currentMonth = -1
let isFinale = false
const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', '2026']

// Build the timeline HTML
function buildTimeline() {
  let html = ''

  for (const monthData of timelineData) {
    html += `
      <section class="month-section" data-month="${monthData.month}">
        <h2 class="month-header">${monthData.month}</h2>
        <div class="month-content">
    `

    // Releases
    if (monthData.releases && monthData.releases.length > 0) {
      html += '<div class="section-divider">Model Releases</div>'
      for (const release of monthData.releases) {
        const colorClass = `color-${release.company}`
        const companyName = companyColors[release.company]?.name || release.company
        const highlightClass = release.highlight ? 'highlight' : ''
        html += `
          <div class="release-card ${colorClass} ${highlightClass}">
            <div class="release-name">${release.name}</div>
            <div class="release-company">${companyName}</div>
          </div>
        `
      }
    }

    // Events
    if (monthData.events && monthData.events.length > 0) {
      html += '<div class="section-divider">Key Events & Breakthroughs</div>'
      for (const event of monthData.events) {
        html += `
          <div class="event-card">
            <div class="event-type">${event.type}</div>
            <div class="event-title">${event.title}</div>
            <div class="event-description">${event.description}</div>
          </div>
        `
      }
    }

    html += `
        </div>
      </section>
    `
  }

  timelineContent.innerHTML = html
}

// Build progress nav
function buildProgressNav() {
  let html = ''
  for (let i = 0; i < 13; i++) {
    const isFinale = i === 12
    html += `<div class="progress-dot ${isFinale ? 'finale' : ''}" data-month="${i}" data-label="${monthLabels[i]}"></div>`
  }
  progressNav.innerHTML = html
}

// Launch fireworks for a month
function launchMonthFireworks(monthIndex) {
  const monthData = timelineData[monthIndex]
  if (!monthData) return

  // Launch fireworks for each release
  const releases = monthData.releases || []
  releases.forEach((release, i) => {
    setTimeout(() => {
      const x = (Math.random() - 0.5) * 1.2
      const colors = companyColors[release.company] || { primary: 0xffffff, secondary: 0xcccccc }
      fireworkSystem.launch(x, colors.primary, colors.secondary)

      // Extra fireworks for highlights
      if (release.highlight) {
        setTimeout(() => {
          fireworkSystem.launch(x + 0.2, colors.secondary, colors.primary)
        }, 150)
      }
    }, i * 250)
  })
}

// Set active month (for progress nav)
function setActiveMonth(index) {
  if (index === currentMonth) return
  currentMonth = index

  // Update progress dots
  const dots = progressNav.querySelectorAll('.progress-dot')
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index)
  })

  // Launch fireworks when month changes
  if (index >= 0 && index < 12) {
    launchMonthFireworks(index)
  }
}

// Setup scroll triggers
function setupScrollTriggers() {
  // Hide header on scroll
  ScrollTrigger.create({
    trigger: '#timeline-content',
    start: 'top 80%',
    onEnter: () => {
      header.classList.add('hidden')
      progressNav.classList.add('visible')
    },
    onLeaveBack: () => {
      header.classList.remove('hidden')
      progressNav.classList.remove('visible')
    }
  })

  // Month sections
  const monthSections = document.querySelectorAll('.month-section')
  monthSections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => setActiveMonth(index),
      onEnterBack: () => setActiveMonth(index)
    })

    // Animate cards as they come into view
    const cards = section.querySelectorAll('.release-card, .event-card')
    gsap.fromTo(cards,
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    )
  })

  // Finale section
  ScrollTrigger.create({
    trigger: finaleSection,
    start: 'top 60%',
    onEnter: () => {
      setActiveMonth(12)
      startFinale()
    },
    onLeaveBack: () => {
      stopFinale()
    }
  })
}

// Progress nav click handlers
function setupProgressNavClicks() {
  progressNav.addEventListener('click', (e) => {
    const dot = e.target.closest('.progress-dot')
    if (!dot) return

    const index = parseInt(dot.dataset.month)
    let target

    if (index < 12) {
      target = document.querySelectorAll('.month-section')[index]
    } else {
      target = finaleSection
    }

    if (target) {
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 100 },
        duration: 1,
        ease: 'power2.inOut'
      })
    }
  })
}

// Finale
function startFinale() {
  if (isFinale) return
  isFinale = true
  countdownSection.classList.add('visible')
  fireworkSystem.startCelebration(2)
}

function stopFinale() {
  isFinale = false
  countdownSection.classList.remove('visible')
  fireworkSystem.stopCelebration()
}

// Update countdown timer
function updateCountdown() {
  const now = new Date()
  const newYear = new Date(now.getFullYear() + 1, 0, 1)

  if (now >= newYear) {
    countdownTimer.textContent = '00:00:00'
    return
  }

  const diff = newYear - now
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  countdownTimer.textContent =
    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

// Animation loop
let time = 0
function animate() {
  requestAnimationFrame(animate)

  time += 0.016
  stars.material.uniforms.time.value = time

  fireworkSystem.update()

  if (isFinale) {
    updateCountdown()
  }

  renderer.render(scene, camera)
}

// Handle resize
function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  ScrollTrigger.refresh()
}

window.addEventListener('resize', onResize)

// Load ScrollToPlugin
import('gsap/ScrollToPlugin').then(module => {
  gsap.registerPlugin(module.ScrollToPlugin)
  setupProgressNavClicks()
})

// Initialize
buildTimeline()
buildProgressNav()
setupScrollTriggers()
animate()

// Initial fireworks on load
setTimeout(() => {
  for (let i = 0; i < 3; i++) {
    setTimeout(() => fireworkSystem.launchRandom(), i * 400)
  }
}, 1000)
