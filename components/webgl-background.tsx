"use client"

import { useEffect, useRef } from "react"
import { usePortfolioStore } from "@/lib/store"

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, mousePosition } = usePortfolioStore()
  const glRef = useRef<WebGLRenderingContext | null>(null)
  const programRef = useRef<WebGLProgram | null>(null)
  const positionBufferRef = useRef<WebGLBuffer | null>(null)
  const positionLocationRef = useRef<number>(0)
  const timeLocationRef = useRef<WebGLUniformLocation | null>(null)
  const resolutionLocationRef = useRef<WebGLUniformLocation | null>(null)
  const mouseLocationRef = useRef<WebGLUniformLocation | null>(null)
  const themeLocationRef = useRef<WebGLUniformLocation | null>(null)
  const animationIdRef = useRef<number>(0)
  const startTimeRef = useRef<number>(Date.now())

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl")
    if (!gl) return

    glRef.current = gl

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      attribute vec2 a_texCoord;
      varying vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = a_texCoord;
      }
    `

    // Fragment shader source
    const fragmentShaderSource = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_theme;
      varying vec2 v_texCoord;

      vec3 palette(float t) {
        vec3 a = vec3(0.5, 0.5, 0.5);
        vec3 b = vec3(0.5, 0.5, 0.5);
        vec3 c = vec3(1.0, 1.0, 1.0);
        vec3 d = vec3(0.263, 0.416, 0.557);
        return a + b * cos(6.28318 * (c * t + d));
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - u_resolution.xy) / u_resolution.y;
        vec2 uv0 = uv;
        vec3 finalColor = vec3(0.0);
        
        for (float i = 0.0; i < 4.0; i++) {
          uv = fract(uv * 1.5) - 0.5;
          float d = length(uv) * exp(-length(uv0));
          vec3 col = palette(length(uv0) + i * 0.4 + u_time * 0.4);
          d = sin(d * 8.0 + u_time) / 8.0;
          d = abs(d);
          d = pow(0.01 / d, 1.2);
          finalColor += col * d;
        }
        
        // Mouse interaction
        vec2 mouseUv = u_mouse / u_resolution;
        float mouseDist = distance(gl_FragCoord.xy / u_resolution, mouseUv);
        finalColor += 0.1 / (mouseDist * 10.0 + 1.0);
        
        // Theme adjustment
        if (u_theme > 0.5) {
          finalColor *= 0.3; // Darker for light theme
        } else {
          finalColor *= 0.1; // Very dark for dark theme
        }
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null

      gl.shaderSource(shader, source)
      gl.compileShader(shader)

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }

      return shader
    }

    const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
      const program = gl.createProgram()
      if (!program) return null

      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error("Program linking error:", gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        return null
      }

      return program
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)

    if (!vertexShader || !fragmentShader) return

    const program = createProgram(gl, vertexShader, fragmentShader)
    if (!program) return

    programRef.current = program

    // Set up geometry
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1])

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    positionBufferRef.current = positionBuffer

    const positionLocation = gl.getAttribLocation(program, "a_position")
    positionLocationRef.current = positionLocation

    const timeLocation = gl.getUniformLocation(program, "u_time")
    timeLocationRef.current = timeLocation

    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    resolutionLocationRef.current = resolutionLocation

    const mouseLocation = gl.getUniformLocation(program, "u_mouse")
    mouseLocationRef.current = mouseLocation

    const themeLocation = gl.getUniformLocation(program, "u_theme")
    themeLocationRef.current = themeLocation

    const render = () => {
      const gl = glRef.current
      const program = programRef.current
      const positionBuffer = positionBufferRef.current
      const positionLocation = positionLocationRef.current
      const timeLocation = timeLocationRef.current
      const resolutionLocation = resolutionLocationRef.current
      const mouseLocation = mouseLocationRef.current
      const themeLocation = themeLocationRef.current
      const animationId = animationIdRef.current
      const startTime = startTimeRef.current

      if (
        !gl ||
        !program ||
        !positionBuffer ||
        !timeLocation ||
        !resolutionLocation ||
        !mouseLocation ||
        !themeLocation
      )
        return

      const currentTime = (Date.now() - startTime) * 0.001

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.enableVertexAttribArray(positionLocation)
      gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

      gl.uniform1f(timeLocation, currentTime)
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform2f(mouseLocation, mousePosition.x, canvas.height - mousePosition.y)
      gl.uniform1f(themeLocation, theme === "light" ? 1.0 : 0.0)

      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animationIdRef.current = requestAnimationFrame(render)
    }

    resizeCanvas()
    render()

    const handleResize = () => {
      resizeCanvas()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
    }
  }, [theme, mousePosition])

  return <canvas ref={canvasRef} className="webgl-canvas" />
}
