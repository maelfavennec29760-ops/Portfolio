
export const plasmaVertexShader = `
  uniform float uTime;

  varying vec2 vPosition;
  varying float vRadial;

  float organicWave(float angle, float time) {
    float wave1 =
      sin(angle * 4.0 + time * 0.65) * 0.045;

    float wave2 =
      sin(angle * 9.0 - time * 0.85) * 0.025;

    float wave3 =
      sin(angle * 3.0 + time * 0.35) *
      cos(angle * 5.0 - time * 0.45) * 0.045;

    return wave1 + wave2 + wave3;
  }

  void main() {
    vec3 pos = position;

    float angle = atan(pos.y, pos.x);
    float radius = length(pos.xy);

    float deformation = organicWave(angle, uTime);

    // Respiration du plasma
    float breathing =
      sin(uTime * 0.8 + angle * 3.0) * 0.025;

    float radialFactor = (radius - 1.5) / 0.22;

    float newRadius =
      radius +
      deformation +
      radialFactor * breathing;

    pos.xy *= newRadius / max(radius, 0.001);

    vPosition = pos.xy;
    vRadial = radialFactor;

    gl_Position =
      projectionMatrix *
      modelViewMatrix *
      vec4(pos, 1.0);
  }
`;

export const plasmaFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;

  varying vec2 vPosition;
  varying float vRadial;

  float hash(vec2 p) {
    return fract(
      sin(dot(p, vec2(127.1, 311.7))) *
      43758.5453
    );
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    f = f * f * (3.0 - 2.0 * f);

    return mix(
      mix(
        hash(i),
        hash(i + vec2(1.0, 0.0)),
        f.x
      ),
      mix(
        hash(i + vec2(0.0, 1.0)),
        hash(i + vec2(1.0, 1.0)),
        f.x
      ),
      f.y
    );
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;

    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  void main() {
    float angle = atan(vPosition.y, vPosition.x);
    float radius = length(vPosition);
    float time = uTime;

    // Coordonnées circulaires sans couture
    vec2 circle = vec2(
      cos(angle),
      sin(angle)
    );

    // Courants d'énergie continus
    float current1 = fbm(
      circle * 5.0 +
      vec2(
        cos(time * 0.45),
        sin(time * 0.45)
      ) * 0.8 +
      radius * 2.0
    );

    float current2 = fbm(
      circle * 9.0 +
      vec2(
        sin(time * 0.3),
        cos(time * 0.3)
      ) * 0.7 -
      radius * 3.0
    );

    // Déformation organique
    vec2 distortion = vec2(
      current1 - 0.5,
      current2 - 0.5
    ) * 1.8;

    // Flux principal
    float flow = fbm(
      circle * 7.0 +
      distortion +
      vec2(
        -time * 0.18,
        time * 0.12
      ) +
      radius * 4.0
    );

    // Turbulences fines
    float turbulence = fbm(
      circle * 14.0 +
      distortion * 2.5 +
      vec2(
        time * 0.22,
        -time * 0.35
      ) +
      radius * 8.0
    );

    // Filaments continus sur 360 degrés
    float filamentWave =
      sin(angle * 24.0 +
          flow * 11.0 +
          current2 * 5.0 -
          time * 1.4);

    float filaments = pow(
      max(0.0, filamentWave),
      12.0
    );

    // Bords diffus
    float radial = abs(vRadial);

    float edge = 1.0 - smoothstep(
      0.55,
      1.0,
      radial
    );

    // Densité du plasma
    float density =
      0.55 +
      turbulence * 0.45;

    // Intensité énergétique
    float energy =
      0.35 +
      flow * 0.65 +
      turbulence * 0.5 +
      filaments * 0.8;

    vec3 color = uColor * energy * 1.5;

    color +=
      vec3(0.25, 0.08, 0.4) * filaments;

    float alpha = edge * density;

    gl_FragColor = vec4(color, alpha);
  }
`;
