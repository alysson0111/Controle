import React, { useMemo, useState } from "react"
import {
  Fish,
  Activity,
  Wheat,
  BarChart3,
  DollarSign,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="bg-gradient-to-r from-blue-700 to-cyan-500 rounded-3xl shadow-2xl p-8 text-white mb-8">
          <h1 className="text-5xl font-black flex items-center gap-4">
            <Fish size={48} />
            Sistema Profissional de Piscicultura
          </h1>

          <p className="text-xl mt-4 opacity-90">
            Controle de produção, biometria, ração e custos
          </p>
        </div>

        {/* DASHBOARD */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-3xl shadow-2xl p-6 hover:scale-105 transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Tanques</p>
                <h2 className="text-5xl font-black mt-3">
                  {tanques.length}
                </h2>
              </div>

              <div className="bg-blue-100 p-4 rounded-2xl">
                <Fish size={40} className="text-blue-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 hover:scale-105 transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Biomassa</p>
                <h2 className="text-4xl font-black mt-3">
                  {biomassaTotal.toFixed(2)} kg
                </h2>
              </div>

              <div className="bg-green-100 p-4 rounded-2xl">
                <Activity size={40} className="text-green-700" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-6 hover:scale-105 transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Ração</p>
                <h2 className="text-4xl font-black mt-3">
                  {totalRacao.toFixed(2)} kg
                </h2>
              </div>

              <div className="bg-orange-100 p-4 rounded-2xl">
                <Wheat size={40} className="text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl shadow-2xl p-6 text-white hover:scale-105 transition-all">
            <div className="flex justify-between items-center">
              <div>
                <p>RCA</p>
                <h2 className="text-5xl font-black mt-3">
                  {rca}
                </h2>
              </div>

              <BarChart3 size={40} />
            </div>
          </div>
        </div>

        {/* MENU */}

        <div className="flex flex-wrap gap-4 mb-8">

          {["tanques", "biometria", "racao", "custos", "relatorios"].map((item) => (
            <button
              key={item}
              onClick={() => setAba(item)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                aba === item
                  ? "bg-blue-600 text-white shadow-xl scale-105"
                  : "bg-white hover:bg-blue-50"
              }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        {/* TANQUES */}

        {aba === "tanques" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h2 className="text-3xl font-black mb-6">
                Cadastro de Tanques
              </h2>

              <form onSubmit={salvarTanque} className="space-y-4">

                <input
                  type="text"
                  placeholder="Nome do tanque"
                  className="w-full border-2 border-slate-200 rounded-2xl p-4 focus:border-blue-500 outline-none"
                  value={formTanque.nome}
                  onChange={(e) =>
                    setFormTanque({
                      ...formTanque,
                      nome: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Espécie"
                  className="w-full border-2 border-slate-200 rounded-2xl p-4"
                  value={formTanque.especie}
                  onChange={(e) =>
                    setFormTanque({
                      ...formTanque,
                      especie: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Quantidade"
                  className="w-full border-2 border-slate-200 rounded-2xl p-4"
                  value={formTanque.quantidade}
                  onChange={(e) =>
                    setFormTanque({
                      ...formTanque,
                      quantidade: e.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Peso Médio (g)"
                  className="w-full border-2 border-slate-200 rounded-2xl p-4"
                  value={formTanque.peso}
                  onChange={(e) =>
                    setFormTanque({
                      ...formTanque,
                      peso: e.target.value,
                    })
                  }
                />

                <button className="w-full bg-gradient-to-r from-blue-700 to-cyan-500 hover:opacity-90 text-white rounded-2xl p-4 text-lg font-bold shadow-xl">
                  Salvar Tanque
                </button>
              </form>
            </div>

            <div className="space-y-6">
              {tanques.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-2xl p-6 hover:scale-[1.02] transition-all"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-3xl font-black">
                        {item.nome}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {item.especie}
                      </p>
                    </div>

                    <button
                      onClick={() => excluirTanque(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl font-bold"
                    >
                      Excluir
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">

                    <div className="bg-slate-100 rounded-2xl p-4">
                      <p className="text-gray-500 text-sm">
                        Quantidade
                      </p>

                      <h3 className="text-3xl font-black mt-2">
                        {item.quantidade}
                      </h3>
                    </div>

                    <div className="bg-blue-100 rounded-2xl p-4">
                      <p className="text-blue-700 text-sm">
                        Peso Médio
                      </p>

                      <h3 className="text-3xl font-black mt-2 text-blue-700">
                        {item.peso} g
                      </h3>
                    </div>

                    <div className="bg-green-100 rounded-2xl p-4 border border-green-500">
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

        {/* BIOMETRIA */}

        {aba === "biometria" && (
          <div className="bg-white rounded-3xl shadow-2xl p-8">

            <h2 className="text-3xl font-black mb-6">
              Biometria
            </h2>

            <form
              onSubmit={salvarBiometria}
              className="grid grid-cols-1 md:grid-cols-4 gap-4"
            >

              <select
                className="border-2 border-slate-200 rounded-2xl p-4"
                value={formBiometria.tanque}
                onChange={(e) =>
                  setFormBiometria({
                    ...formBiometria,
                    tanque: e.target.value,
                  })
                }
              >
                <option value="">Selecione o tanque</option>

                {tanques.map((item) => (
                  <option key={item.id}>
                    {item.nome}
                  </option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Quantidade"
                className="border-2 border-slate-200 rounded-2xl p-4"
                value={formBiometria.quantidade}
                onChange={(e) =>
                  setFormBiometria({
                    ...formBiometria,
                    quantidade: e.target.value,
                  })
                }
              />

              <input
                type="number"
                placeholder="Peso Médio"
                className="border-2 border-slate-200 rounded-2xl p-4"
                value={formBiometria.peso}
                onChange={(e) =>
                  setFormBiometria({
                    ...formBiometria,
                    peso: e.target.value,
                  })
                }
              />

              <button className="bg-green-600 hover:bg-green-700 text-white rounded-2xl font-bold">
                Salvar
              </button>
            </form>

            <div className="space-y-4 mt-8">
              {biometrias.map((item) => (
                <div
                  key={item.id}
                  className="bg-slate-100 rounded-3xl p-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-black">
                      {item.tanque}
                    </h2>

                    <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold">
                      {item.data}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-5">

                    <div>
                      <p className="text-gray-500">
                        Quantidade
                      </p>

                      <h3 className="text-2xl font-black">
                        {item.quantidade}
                      </h3>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        Peso Médio
                      </p>

                      <h3 className="text-2xl font-black">
                        {item.peso} g
                      </h3>
                    </div>

                    <div>
                      <p className="text-green-700">
                        Biomassa
                      </p>

                      <h3 className="text-2xl font-black text-green-700">
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