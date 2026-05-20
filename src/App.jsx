import React, { useMemo, useState } from "react"
import {
  Fish,
  Activity,
  Wheat,
  DollarSign,
  Trash2,
  Plus,
  BarChart3,
} from "lucide-react"

export default function SistemaPisciculturaPro() {
  const [aba, setAba] = useState("tanques")

  const [tanques, setTanques] = useState([])
  const [biometrias, setBiometrias] = useState([])
  const [racoes, setRacoes] = useState([])
  const [custos, setCustos] = useState([])

  const [formTanque, setFormTanque] = useState({
    nome: "",
    especie: "Tilápia",
    quantidade: "",
    peso: "",
  })

  const [formBiometria, setFormBiometria] = useState({
    tanque: "",
    quantidade: "",
    peso: "",
  })

  const [formRacao, setFormRacao] = useState({
    tanque: "",
    tipo: "",
    quantidade: "",
    valor: "",
  })

  const [formCusto, setFormCusto] = useState({
    descricao: "",
    valor: "",
  })

  function salvarTanque(e) {
    e.preventDefault()

    const biomassa = (
      (Number(formTanque.quantidade || 0) *
        Number(formTanque.peso || 0)) /
      1000
    ).toFixed(2)

    const novo = {
      id: Date.now(),
      ...formTanque,
      biomassa,
    }

    setTanques([novo, ...tanques])

    setFormTanque({
      nome: "",
      especie: "Tilápia",
      quantidade: "",
      peso: "",
    })
  }

  function salvarBiometria(e) {
    e.preventDefault()

    const biomassa = (
      (Number(formBiometria.quantidade || 0) *
        Number(formBiometria.peso || 0)) /
      1000
    ).toFixed(2)

    const nova = {
      id: Date.now(),
      ...formBiometria,
      biomassa,
      data: new Date().toLocaleDateString(),
    }

    setBiometrias([nova, ...biometrias])

    setFormBiometria({
      tanque: "",
      quantidade: "",
      peso: "",
    })
  }

  function salvarRacao(e) {
    e.preventDefault()

    const nova = {
      id: Date.now(),
      ...formRacao,
    }

    setRacoes([nova, ...racoes])

    setFormRacao({
      tanque: "",
      tipo: "",
      quantidade: "",
      valor: "",
    })
  }

  function salvarCusto(e) {
    e.preventDefault()

    const novo = {
      id: Date.now(),
      ...formCusto,
    }

    setCustos([novo, ...custos])

    setFormCusto({
      descricao: "",
      valor: "",
    })
  }

  function excluirTanque(id) {
    setTanques(tanques.filter((item) => item.id !== id))
  }

  const biomassaTotal = useMemo(() => {
    return tanques.reduce((acc, item) => {
      return acc + Number(item.biomassa || 0)
    }, 0)
  }, [tanques])

  const totalRacao = useMemo(() => {
    return racoes.reduce((acc, item) => {
      return acc + Number(item.quantidade || 0)
    }, 0)
  }, [racoes])

  const totalCustos = useMemo(() => {
    return custos.reduce((acc, item) => {
      return acc + Number(item.valor || 0)
    }, 0)
  }, [custos])

  const rca = useMemo(() => {
    if (biomassaTotal <= 0) return 0

    return (totalRacao / biomassaTotal).toFixed(2)
  }, [totalRacao, biomassaTotal])

  function TabButton({ id, label }) {
    return (
      <button
        onClick={() => setAba(id)}
        className={`
          px-6
          py-3
          rounded-2xl
          font-bold
          transition-all
          duration-300
          ${
            aba === id
              ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-xl scale-105"
              : "bg-white hover:bg-slate-100 text-slate-700"
          }
        `}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-cyan-50 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 rounded-[32px] shadow-2xl p-10 text-white">
          <div className="flex items-center gap-4">
            <Fish size={50} />

            <div>
              <h1 className="text-5xl font-black">
                Sistema Piscicultura PRO
              </h1>

              <p className="text-xl mt-2 opacity-90">
                Controle profissional da produção de peixes
              </p>
            </div>
          </div>
        </div>

        {/* DASHBOARD */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-3xl shadow-2xl p-6 hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Tanques</p>

                <h2 className="text-5xl font-black mt-3">
                  {tanques.length}
                </h2>
              </div>

              <Fish className="text-cyan-600" size={50} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Biomassa</p>

                <h2 className="text-4xl font-black mt-3">
                  {biomassaTotal.toFixed(2)} kg
                </h2>
              </div>

              <Activity className="text-green-600" size={50} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-slate-500">Ração</p>

                <h2 className="text-4xl font-black mt-3">
                  {totalRacao.toFixed(2)} kg
                </h2>
              </div>

              <Wheat className="text-orange-500" size={50} />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-3xl shadow-2xl p-6 hover:-translate-y-1 transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p className="opacity-80">RCA</p>

                <h2 className="text-5xl font-black mt-3">
                  {rca}
                </h2>
              </div>

              <BarChart3 size={50} />
            </div>
          </div>

        </div>

        {/* TABS */}

        <div className="flex flex-wrap gap-3">
          <TabButton id="tanques" label="Tanques" />
          <TabButton id="biometria" label="Biometria" />
          <TabButton id="racao" label="Ração" />
          <TabButton id="custos" label="Custos" />
          <TabButton id="relatorio" label="Relatórios" />
        </div>

        {/* TANQUES */}

        {aba === "tanques" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl shadow-2xl p-8">

              <h2 className="text-3xl font-black mb-8">
                Cadastro de Tanques
              </h2>

              <form onSubmit={salvarTanque} className="space-y-5">

                <input
                  placeholder="Nome do tanque"
                  value={formTanque.nome}
                  onChange={(e) =>
                    setFormTanque({
                      ...formTanque,
                      nome: e.target.value,
                    })
                  }
                  className="w-full h-14 rounded-2xl border border-slate-300 bg-slate-50 px-5 text-lg focus:outline-none focus:ring-4 focus:ring-cyan-200"
                />

                <input
                  placeholder="Espécie"
                  value={formTanque.especie}
                  onChange={(e) =>
                    setFormTanque({
                      ...formTanque,
                      especie: e.target.value,
                    })
                  }
                  className="w-full h-14 rounded-2xl border border-slate-300 bg-slate-50 px-5 text-lg focus:outline-none focus:ring-4 focus:ring-cyan-200"
                />

                <input
                  type="number"
                  placeholder="Quantidade"
                  value={formTanque.quantidade}
                  onChange={(e) =>
                    setFormTanque({
                      ...formTanque,
                      quantidade: e.target.value,
                    })
                  }
                  className="w-full h-14 rounded-2xl border border-slate-300 bg-slate-50 px-5 text-lg focus:outline-none focus:ring-4 focus:ring-cyan-200"
                />

                <input
                  type="number"
                  placeholder="Peso Médio (g)"
                  value={formTanque.peso}
                  onChange={(e) =>
                    setFormTanque({
                      ...formTanque,
                      peso: e.target.value,
                    })
                  }
                  className="w-full h-14 rounded-2xl border border-slate-300 bg-slate-50 px-5 text-lg focus:outline-none focus:ring-4 focus:ring-cyan-200"
                />

                <button
                  className="
                    w-full
                    h-14
                    rounded-2xl
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    text-white
                    text-lg
                    font-bold
                    shadow-xl
                    hover:scale-[1.02]
                    transition-all
                  "
                >
                  <div className="flex items-center justify-center gap-2">
                    <Plus size={22} />
                    Salvar Tanque
                  </div>
                </button>

              </form>

            </div>

            <div className="space-y-5">

              {tanques.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-2xl p-6 hover:-translate-y-1 transition-all"
                >

                  <div className="flex justify-between items-center">

                    <div>
                      <h2 className="text-3xl font-black">
                        {item.nome}
                      </h2>

                      <p className="text-slate-500 mt-1">
                        {item.especie}
                      </p>
                    </div>

                    <button
                      onClick={() => excluirTanque(item.id)}
                      className="
                        bg-red-500
                        hover:bg-red-600
                        text-white
                        rounded-2xl
                        p-3
                        transition-all
                      "
                    >
                      <Trash2 />
                    </button>

                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">

                    <div className="bg-slate-100 rounded-2xl p-4">
                      <p className="text-slate-500 text-sm">
                        Quantidade
                      </p>

                      <h3 className="text-3xl font-black mt-2">
                        {item.quantidade}
                      </h3>
                    </div>

                    <div className="bg-slate-100 rounded-2xl p-4">
                      <p className="text-slate-500 text-sm">
                        Peso Médio
                      </p>

                      <h3 className="text-3xl font-black mt-2">
                        {item.peso} g
                      </h3>
                    </div>

                    <div className="bg-green-100 border border-green-400 rounded-2xl p-4">
                      <p className="text-green-700 text-sm">
                        Biomassa
                      </p>

                      <h3 className="text-3xl font-black mt-2 text-green-700">
                        {item.biomassa} kg
                      </h3>
                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

      </div>
    </div>
  )
}