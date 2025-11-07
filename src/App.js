import React, { useEffect, useState } from "react";

/**
 * App.js - Aplicativo "Calidad de Software"
 * Requiere: Create React App + TailwindCSS (ya instalado)
 *
 * Pega este archivo en src/App.js y guarda. La app usa localStorage para persistir evaluaciones.
 */

const DEFAULT_METRICS = [
  { key: "funcionalidad", label: "Funcionalidad", value: 4, weight: 1 },
  { key: "confiabilidad", label: "Confiabilidad", value: 4, weight: 1 },
  { key: "usabilidad", label: "Usabilidad", value: 4, weight: 1 },
  { key: "eficiencia", label: "Eficiencia", value: 4, weight: 1 },
  { key: "mantenibilidad", label: "Mantenibilidad", value: 4, weight: 1 },
  { key: "portabilidad", label: "Portabilidad", value: 4, weight: 1 },
];

const STORAGE_KEY = "calidadsoftware_evaluaciones_v1";

function scoreToGrade(score) {
  if (score >= 4.5) return "Excelente";
  if (score >= 3.5) return "Bueno";
  if (score >= 2.5) return "Aceptable";
  if (score >= 1.5) return "Insuficiente";
  return "Deficiente";
}

function calculateScore(metrics) {
  const totalWeight = metrics.reduce((s, m) => s + (Number(m.weight) || 0), 0) || 1;
  const weightedSum = metrics.reduce((s, m) => s + (Number(m.value) || 0) * (Number(m.weight) || 0), 0);
  const score = weightedSum / totalWeight;
  return Math.max(0, Math.min(5, Number(score.toFixed(2))));
}

export default function App() {
  const [projectName, setProjectName] = useState("Aplicativo educativo de ejemplo");
  const [metrics, setMetrics] = useState(DEFAULT_METRICS);
  const [notes, setNotes] = useState("");
  const [evaluations, setEvaluations] = useState([]);
  const [activeTab, setActiveTab] = useState("inicio");
  const [checklist, setChecklist] = useState({
    video: false,
    pdfApa: false,
    enlacePublico: false,
  });

  // Load saved evaluations from localStorage at start
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEvaluations(JSON.parse(raw));
    } catch (e) {
      console.error("No se pudo leer localStorage", e);
    }
  }, []);

  // Save to localStorage when evaluations change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
    } catch (e) {
      console.error("No se pudo guardar en localStorage", e);
    }
  }, [evaluations]);

  function updateMetric(index, field, val) {
    setMetrics((prev) => prev.map((m, i) => (i === index ? { ...m, [field]: val } : m)));
  }

  function resetMetrics() {
    setMetrics(DEFAULT_METRICS.map(m => ({ ...m })));
  }

  function saveEvaluation() {
    const score = calculateScore(metrics);
    const rec = {
      id: Date.now(),
      projectName,
      metrics: JSON.parse(JSON.stringify(metrics)),
      score,
      grade: scoreToGrade(score),
      notes,
      checklist,
      date: new Date().toISOString(),
    };
    setEvaluations((prev) => [rec, ...prev]);
    alert("Evaluación guardada localmente.");
  }

  function exportJSON(rec = null) {
    const data = rec ? rec : { projectName, metrics, score: calculateScore(metrics), notes, checklist };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(data.projectName || "evaluacion").replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportCSV(rec = null) {
    const target = rec ? rec : { projectName, metrics, score: calculateScore(metrics), notes };
    const header = ["Proyecto", "Métrica", "Valor", "Peso"];
    let rows = [];
    target.metrics.forEach((m) => rows.push([target.projectName || projectName, m.label, m.value, m.weight]));
    rows.push(["", "Puntuación final", target.score ?? calculateScore(metrics), ""]);
    const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(target.projectName || projectName).replace(/\s+/g, "_")}_evaluacion.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyEvaluation(rec) {
    try {
      const data = rec ? rec : { projectName, metrics, score: calculateScore(metrics), notes };
      await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
      alert("Evaluación copiada al portapapeles.");
    } catch (e) {
      alert("No se pudo copiar al portapapeles.");
    }
  }

  function removeEvaluation(id) {
    if (!window.confirm("¿Eliminar esta evaluación?")) return;
    setEvaluations((prev) => prev.filter((r) => r.id !== id));
  }

  // Simple informational contents
  const contenidos = {
    calidad: (
      <>
        <p className="mb-2">
        Calidad de software es el grado en que un producto de software cumple con los requisitos funcionales y no funcionales establecidos, y
        satisface las necesidades y expectativas del cliente o usuario final.
        En otras palabras, no se trata solo de que el software “funcione”, sino de que lo haga de manera eficiente, segura, usable y mantenible.
        </p>
        <br></br>
        <p className="mb-2"><strong>🔹Aspectos Clave</strong>
        </p>
         <p className="mb-2">
            <ul>
              <li>• Cumplimiento de requisitos: el software hace lo que se ha acordado.</li>
              <li>• Satisfacción de expectativas de usuarios: más allá de lo que se especificó, cómo lo perciben los usuarios.</li>
              <li>• Características no funcionales importantes: usabilidad, rendimiento, seguridad, mantenibilidad, portabilidad, etc.</li>
              <li>• Mejora continua: la calidad no es un estado fijo sino algo que se debe vigilar y mejorar.</li>
            </ul>
        </p>
        <br></br>
        <p className="mb-2">
          <strong>💡 Beneficios de calidad de software</strong>
        </p>
         <p className="mb-2">
            <ul>
              <li>• Menos errores y fallos: lo que reduce costes de mantenimiento, soporte, correcciones.</li>
              <li>• Mejor experiencia de usuario: lo que potencia la adopción, satisfacción, reputación del producto.</li>
              <li>• Mayor mantenibilidad y escalabilidad: facilita modificaciones futuras, reutilización.</li>
              <li>• Mejor alineamiento con el negocio y los requisitos: menor riesgo de que el software no cumpla la función prevista.</li>
              <li>• Reducción de costes y tiempo: a largo plazo, buen diseño y calidad evitan retrabajos y grabes problemas.</li>
            </ul>
        </p>
      </>
    ),
    normas: (
      <>
        <p className="mb-2" class="APP">
        Las normas son marcos internacionales que definen criterios, procesos y características para garantizar la calidad del software y
        de los procesos que lo desarrollan.
        </p>
        <br></br>
        <p className="mb-2"><strong>NORMAS PRINCIPALES:</strong>
        </p>
         <p className="mb-2">
            <ul>
              <strong>✅ ISO/IEC 25010 (Modelo de Calidad de Producto)</strong><li> Define ocho características principales de calidad de software:
              Adecuación funcional, Fiabilidad, Usabilidad, Eficiencia del rendimiento, Mantenibilidad, Portabilidad, Compatibilidad y Seguridad</li>
              <br></br>
              <strong>✅ ISO/IEC 9126 (Modelo anterior a ISO 25010)</strong><li> Fue la base para la norma 25010 y define también características de 
              calidad y métricas para evaluarlas.</li>
              <br></br>
              <strong>✅ ISO/IEC 15504 (SPICE)</strong><li> Establece un marco para la evaluación y mejora de procesos de desarrollo de software.</li>
              <br></br>
              <strong>✅ ISO/IEC 5055</strong><li> Se centra en la medición estructural de la calidad interna del software, evaluando el código fuente 
              en factores como seguridad, confiabilidad y mantenibilidad.</li>
              <br></br>
              <strong>✅ ISO 9001 (Gestión de la Calidad)</strong><li> La ISO 9001 es una norma internacional que establece los requisitos para un sistema 
              de gestión de calidad (SGC).
              Aunque no está dirigida exclusivamente al software, se aplica ampliamente en el desarrollo y mantenimiento de software para asegurar que los 
              procesos de una organización estén controlados y orientados a la mejora continua.</li>
            </ul>
        </p>
      </>
    ),
    modelos: (
      <>
        <p className="mb-2" class="APP">
        Los modelos de calidad proporcionan marcos conceptuales que ayudan a evaluar y mejorar los productos de software.
        </p>
        <br></br>
        <p className="mb-2"><strong>MODELOS MÁS RECONOCIDOS:</strong>
        </p>
         <p className="mb-2">
            <ul>
              <strong>🧱 Modelo de McCall (1977)</strong><li> Agrupa la calidad en tres grandes categorías:</li>
              <li><strong>• Operación del producto:</strong> Corrección, fiabilidad, eficiencia, integridad, usabilidad.</li>
              <li><strong>• Revisión del producto:</strong> Mantenibilidad, flexibilidad, testabilidad.</li>
              <li><strong>• Transición del producto:</strong> Portabilidad, reutilización, interoperabilidad.</li>
              <br></br>
              <strong>🧩 Modelo de Boehm (1978)</strong><li> Destaca factores como corrección, fiabilidad, eficiencia, seguridad y facilidad de 
              uso, orientado tanto al usuario como al ingeniero de software. </li>
              <br></br>
              <strong>⚙️ Modelo FURPS (de Hewlett-Packard)</strong><li> Define 5 atributos:</li>
              <li><strong>• F:</strong> Funcionalidad</li>
              <li><strong>• U:</strong> Usabilidad</li>
              <li><strong>• R:</strong> Fiabilidad</li>
              <li><strong>• P:</strong> Rendimiento (Performance)</li>
              <li><strong>• S:</strong> Soportabilidad</li>
              <br></br>
              <strong>🌐 Modelo ISO/IEC 25010</strong><li> El más actualizado, utilizado hoy como referencia mundial, tanto 
              en proyectos de desarrollo como en auditorías de calidad de software.</li>
            </ul>
        </p>
      </>
    ),
    estandares: (
      <>
        <p className="mb-2" class="APP">
        Los estándares establecen requisitos, métricas y buenas prácticas que permiten medir y garantizar la calidad del software.
        </p>
        <br></br>
        <p className="mb-2"><strong>📏 EJEMPLOS DE ESTÁNDARES:</strong>
        </p>
        <p className="mb-2">
            <ul>
              <li><strong>• ISO/IEC 90003:</strong> Guía para aplicar la norma ISO 9001 específicamente al software.</li>
              <li><strong>• IEEE 829:</strong> Estándar para documentación de pruebas de software.</li>
              <li><strong>• IEEE 730:</strong> Estándar para la planificación y aseguramiento de calidad de software.</li>
              <li><strong>• ISO/IEC 25000 (SQuaRE):</strong> Marco que reúne estándares relacionados con la evaluación de la calidad del software.</li>
            </ul>
        </p>
        <p className="text-sm text-gray-600">NOTA: Mantener estándares ayuda en mantenibilidad y colaboración del equipo.</p>
      </>
    ),
    // codigo: (
    //   <>
    //     <p className="mb-2">
    //       Código y programación: buenas prácticas (clean code), revisiones por pares, linting (ESLint), integración continua (CI/CD) y testing automatizado.
    //     </p>
    //   </>
    // ),
    // pruebas: (
    //   <>
    //     <p className="mb-2">
    //       Pruebas: unitarias, integración, sistema y aceptación. Medir cobertura y porcentaje de pruebas exitosas para convertir a puntuaciones 0–5.
    //     </p>
    //   </>
    // ),
    // conclusiones: (
    //   <>
    //     <p className="mb-2">
    //       Recomendada la automatización de pruebas, métricas claras y documentación completa (README, manual de usuario, y evidencia en video).
    //     </p>
    //   </>
    // ),
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-sky-700 text-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-extrabold">CALIDAD DE SOFTWARE</h1>
            <p className="text-sm opacity-90">Normas, Modelos, Estándares y Evaluación</p>
          </div>
          <nav className="space-x-2">
            <button onClick={() => setActiveTab("inicio")} className={`px-3 py-1 rounded ${activeTab==="inicio" ? "bg-white text-sky-700 font-semibold" : "bg-white/10"}`}>Inicio</button>
            <button onClick={() => setActiveTab("calidad")} className={`px-3 py-1 rounded ${activeTab==="calidad" ? "bg-white text-sky-700 font-semibold" : "bg-white/10"}`}>Calidad de Software</button>
            <button onClick={() => setActiveTab("normas")} className={`px-3 py-1 rounded ${activeTab==="normas" ? "bg-white text-sky-700 font-semibold" : "bg-white/10"}`}>Normas</button>
            <button onClick={() => setActiveTab("modelos")} className={`px-3 py-1 rounded ${activeTab==="modelos" ? "bg-white text-sky-700 font-semibold" : "bg-white/10"}`}>Modelos</button>
            <button onClick={() => setActiveTab("estandares")} className={`px-3 py-1 rounded ${activeTab==="estandares" ? "bg-white text-sky-700 font-semibold" : "bg-white/10"}`}>Estándares</button>
            <button onClick={() => setActiveTab("evaluacion")} className={`px-3 py-1 rounded ${activeTab==="evaluacion" ? "bg-white text-sky-700 font-semibold" : "bg-white/10"}`}>Evaluación</button>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: content sections */}
        <section className="lg:col-span-2 space-y-6">
          {activeTab === "inicio" && (
            <article className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-sky-700 mb-3">Calidad de Software</h2>
              <p className="mb-4">Este aplicativo presenta las normas, modelos y un prototipo práctico de evaluación cuantitativa de calidad del software. Usa las pestañas en el encabezado para navegar o baja para evaluar un aplicativo.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded p-4">
                  <h3 className="font-semibold">Normas</h3>
                  <p className="text-sm text-gray-600 mt-2">ISO/IEC 25010, IEEE — Definen atributos y criterios de calidad.</p>
                </div>
                <div className="border rounded p-4">
                  <h3 className="font-semibold">Modelos</h3>
                  <p className="text-sm text-gray-600 mt-2">ISO 9126/25010, CMMI — Para evaluar procesos y calidad.</p>
                </div>
                <div className="border rounded p-4">
                  <h3 className="font-semibold">Estándares</h3>
                  <p className="text-sm text-gray-600 mt-2">Convenciones de código, documentación y pruebas.</p>
                </div>
                <div className="border rounded p-4">
                  <h3 className="font-semibold">Pruebas y evaluación</h3>
                  <p className="text-sm text-gray-600 mt-2">Prototipo de evaluación y métricas cuantitativas para validar la calidad del software.</p>
                </div>
              </div>
            </article>
          )}

          {activeTab === "calidad" && (
            <article className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-sky-700 mb-3">Calidad de Software</h2>
              {contenidos.calidad}
            </article>
          )}

          {activeTab === "normas" && (
            <article className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-sky-700 mb-3">Normas</h2>
              {contenidos.normas}
            </article>
          )}

          {activeTab === "modelos" && (
            <article className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-sky-700 mb-3">Modelos</h2>
              {contenidos.modelos}
            </article>
          )}

          {activeTab === "estandares" && (
            <article className="bg-white rounded-2xl p-6 shadow">
              <h2 className="text-2xl font-bold text-sky-700 mb-3">Estándares</h2>
              {contenidos.estandares}
            </article>
          )}

          {activeTab === "evaluacion" && (
            <article className="bg-white rounded-2xl p-6 shadow space-y-4">
              <h2 className="text-2xl font-bold text-sky-700">Evaluación Calidad de Software (0–5)</h2>

              <div>
                <label className="block text-sm font-medium">Nombre del proyecto</label>
                <input value={projectName} onChange={(e) => setProjectName(e.target.value)} className="w-full p-2 border rounded mt-1" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {metrics.map((m, i) => (
                  <div key={m.key} className="p-3 border rounded">
                    <div className="flex justify-between items-center">
                      <div className="font-medium">{m.label}</div>
                      <div className="text-sm text-gray-500">Valor: {m.value} • Peso: {m.weight}</div>
                    </div>
                    <div className="mt-2">
                      <input type="range" min="0" max="5" step="0.1" value={m.value} onChange={(e) => updateMetric(i, "value", Number(e.target.value))} className="w-full" />
                      <div className="mt-2 flex items-center gap-2">
                        <input type="number" min="0" max="5" step="0.1" value={m.weight} onChange={(e) => updateMetric(i, "weight", Number(e.target.value))} className="w-24 p-1 border rounded" />
                        <button onClick={() => updateMetric(i, "value", 0)} className="px-2 py-1 border rounded text-sm">Reset Valor</button>
                        <button onClick={() => updateMetric(i, "weight", 1)} className="px-2 py-1 border rounded text-sm">Reset Peso</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-50 border rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm">Puntuación actual:</div>
                    <div className="text-2xl font-bold">{calculateScore(metrics)} <span className="text-sm italic">({scoreToGrade(calculateScore(metrics))})</span></div>
                  </div>
                  <div className="text-right">
                    <button onClick={resetMetrics} className="px-3 py-2 border rounded mr-2">Reset métricas</button>
                    <button onClick={saveEvaluation} className="px-3 py-2 bg-sky-600 text-white rounded">Guardar evaluación</button>
                  </div>
                </div>

                <label className="block mt-3 text-sm">Notas / Observaciones</label>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full p-2 border rounded" rows={3} />
              </div>

              {/* <div className="p-3 border rounded bg-white">
                <h3 className="font-semibold mb-2">Checklist para entrega (aplicativo educativo)</h3>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2"><input type="checkbox" checked={checklist.video} onChange={(e) => setChecklist({ ...checklist, video: e.target.checked })} /> Video explicativo ≤5 min</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={checklist.pdfApa} onChange={(e) => setChecklist({ ...checklist, pdfApa: e.target.checked })} /> Documento final en APA (PDF)</label>
                  <label className="flex items-center gap-2"><input type="checkbox" checked={checklist.enlacePublico} onChange={(e) => setChecklist({ ...checklist, enlacePublico: e.target.checked })} /> Enlace público al aplicativo</label>
              </div>
               <div className="mt-3 text-sm text-gray-600">
                  Recomendaciones: incluir README, evidencia de pruebas y un video corto mostrando funcionamiento y pruebas.
                </div>
              </div> */}

              <div className="flex gap-2">
                <button onClick={() => exportJSON()} className="px-3 py-2 border rounded">Exportar JSON</button>
                <button onClick={() => exportCSV()} className="px-3 py-2 border rounded">Exportar CSV</button>
                <button onClick={() => copyEvaluation(null)} className="px-3 py-2 border rounded">Copiar JSON</button>
              </div>
            </article>
          )}
        </section>

        {/* Right column: evaluations + quick info */}
        <aside className="space-y-4">
          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold">Evaluaciones guardadas</h3>
            {evaluations.length === 0 ? (
              <p className="text-sm text-gray-500 mt-2">No hay evaluaciones guardadas.</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {evaluations.map((rec) => (
                  <li key={rec.id} className="p-2 border rounded">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">{rec.projectName}</div>
                        <div className="text-xs text-gray-500">{new Date(rec.date).toLocaleString()}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{rec.score}</div>
                        <div className="text-xs">{rec.grade}</div>
                      </div>
                    </div>

                    <div className="mt-2 flex gap-2">
                      <button onClick={() => exportJSON(rec)} className="text-xs px-2 py-1 border rounded">JSON</button>
                      <button onClick={() => exportCSV(rec)} className="text-xs px-2 py-1 border rounded">CSV</button>
                      <button onClick={() => copyEvaluation(rec)} className="text-xs px-2 py-1 border rounded">Copiar</button>
                      <button onClick={() => removeEvaluation(rec.id)} className="text-xs px-2 py-1 border rounded text-red-600">Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold">Checklist y requisitos</h3>
            <ol className="text-sm list-decimal list-inside mt-2 text-gray-600">
              <li>Video explicativo ≤ 5 minutos con demostración.</li>
              <li>Documento final en formato APA (PDF).</li>
              <li>Enlace público al aplicativo (Vercel/Netlify/GitHub Pages).</li>
              <li>README y pruebas automatizadas si es posible.</li>
            </ol>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <h3 className="font-semibold">Recomendaciones de despliegue</h3>
            <ul className="text-sm mt-2 text-gray-600">
              <li><strong>Vercel:</strong> conectar repo GitHub → Deploy automático.</li>
              <li><strong>Netlify:</strong> arrastrar carpeta `build` o conectar repo.</li>
              <li><strong>GitHub Pages:</strong> usar `npm run build` y publicar `build/`.</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow text-sm text-gray-600">
            <h3 className="font-semibold mb-2">Notas</h3>
            <p>Las evaluaciones se almacenan sólo en tu navegador (localStorage). Si quieres compartirlas, usa los botones de exportar.</p>
          </div> */}
        </aside>
      </main>

      <footer className="text-center py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Calidad de Software — Valentina Perez 54430.
      </footer>
    </div>
  );
}
