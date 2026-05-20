import React, { useMemo, useState } from "react"
import {
  Fish,
  Wheat,
  Activity,
  BarChart3,
  Trash2,
} from "lucide-react"

export default function SistemaPisciculturaPro() {
  const [tanques, setTanques] = useState([])
  const [biometrias, setBiometrias] = useState([])
  const [racoes, setRacoes] = useState([])
  const [custos, setCustos] = useState([])

  const [aba, setAba] = useState("tanques")

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

  const botaoAba = (nome, label) => (
    <button
      onClick={() => setAba(nome)}
      className={`px-5 py-3 rounded-2xl font-bold transition ${
        aba === nome
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">

        <div className="bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-3xl p-8 shadow-2xl">
          <h1 className="text-4xl font-bold flex items-center gap-3">
            <Fish size={40} />
            Sistema Profissional de Piscicultura
          </h1>

          <p className="mt-3 text-lg opacity-90">
            Controle de produção, biometria, ração e custos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Tanques</p>
                <h2 className="text-4xl font-bold mt-2">
                  {tanques.length}
                </h2>
              </div>

              <Fish className="text-blue-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Biomassa</p>
                <h2 className="text-4xl font-bold mt-2">
                  {biomassaTotal.toFixed(2)} kg
                </h2>
              </div>

              <Activity className="text-green-600" size={40} />
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">Ração</p>
                <h2 className="text-4xl font-bold mt-2">
                  {totalRacao.toFixed(2)} kg
                </h2>
              </div>

              <Wheat className="text-orange-500" size={40} />
            </div>
          </div>

          <div className="bg-green-100 border-2 border-green-500 rounded-3xl shadow-xl p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-green-700">RCA</p>
                <h2 className="text-4xl font-bold mt-2 text-green-700">
                  {rca}
                </h2>
              </div>

              <BarChart3 className="text-green-700" size={40} />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {botaoAba("tanques", "Tanques")}
          {botaoAba("biometria", "Biometria")}
          {botaoAba("racao", "Ração")}
          {botaoAba("custos", "Custos")}
          {botaoAba("relatorio", "Relatórios")}
        </div>

        {aba === "tanques" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6">
                Cadastro de Tanques
              </h2>

              <form onSubmit={salvarTanque} className="space-y-4">

                <input
                  className="w-full border rounded-2xl p-4"
                  placeholder="Nome do tanque"
                  value={formTanque.nome}
                  onChange={(e) =>
                    setFormTanque({
                      ...formTanque,
                      nome: e.target.value,
                    })
                  }
                />

                <input
                  className="w-full border rounded-2xl p-4"
                  placeholder="Espécie"
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
                  className="w-full border rounded-2xl p-4"
                  placeholder="Quantidade"
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
                  className="w-full border rounded-2xl p-4"
                  placeholder="Peso médio (g)"
                  value={formTanque.peso}
                  onChange={(e) =>
                    setFormTanque({
                      ...formTanque,
                      peso: e.target.value,
                    })
                  }
                />

                <button className="w-full bg-blue-600 text-white rounded-2xl h-14 text-lg font-bold">
                  Salvar Tanque
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {tanques.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-xl p-6"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {item.nome}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        {item.especie}
                      </p>
                    </div>

                    <button
                      onClick={() => excluirTanque(item.id)}
                      className="bg-red-500 text-white p-3 rounded-2xl"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">

                    <div className="bg-slate-100 rounded-2xl p-4">
                      <p className="text-sm text-gray-500">
                        Quantidade
                      </p>

                      <h3 className="text-2xl font-bold mt-2">
                        {item.quantidade}
                      </h3>
                    </div>

                    <div className="bg-slate-100 rounded-2xl p-4">
                      <p className="text-sm text-gray-500">
                        Peso Médio
                      </p>

                      <h3 className="text-2xl font-bold mt-2">
                        {item.peso} g
                      </h3>
                    </div>

                    <div className="bg-green-100 border border-green-500 rounded-2xl p-4">
                      <p className="text-sm text-green-700">
                        Biomassa
                      </p>

                      <h3 className="text-2xl font-bold mt-2 text-green-700">
                        {item.biomassa} kg
                      </h3>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {aba === "biometria" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h2 className="text-2xl font-bold mb-6">
                Biometria
              </h2>

              <form
                onSubmit={salvarBiometria}
                className="space-y-4"
              >
                <select
                  className="w-full border rounded-2xl p-4"
                  value={formBiometria.tanque}
                  onChange={(e) =>
                    setFormBiometria({
                      ...formBiometria,
                      tanque: e.target.value,
                    })
                  }
                >
                  <option value="">
                    Selecione o tanque
                  </option>

                  {tanques.map((item) => (
                    <option
                      key={item.id}
                      value={item.nome}
                    >
                      {item.nome}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  className="w-full border rounded-2xl p-4"
                  placeholder="Quantidade"
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
                  className="w-full border rounded-2xl p-4"
                  placeholder="Peso médio"
                  value={formBiometria.peso}
                  onChange={(e) =>
                    setFormBiometria({
                      ...formBiometria,
                      peso: e.target.value,
                    })
                  }
                />

                <button className="w-full bg-green-600 text-white rounded-2xl h-14 text-lg font-bold">
                  Salvar Biometria
                </button>
              </form>
            </div>

            <div className="space-y-4">
              {biometrias.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl shadow-xl p-6"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                      {item.tanque}
                    </h2>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                      {item.data}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-6">

                    <div className="bg-slate-100 rounded-2xl p-4">
                      <p className="text-sm text-gray-500">
                        Quantidade
                      </p>

                      <h3 className="text-2xl font-bold mt-2">
                        {item.quantidade}
                      </h3>
                    </div>

                    <div className="bg-slate-100 rounded-2xl p-4">
                      <p className="text-sm text-gray-500">
                        Peso Médio
                      </p>

                      <h3 className="text-2xl font-bold mt-2">
                        {item.peso} g
                      </h3>
                    </div>

                    <div className="bg-green-100 border border-green-500 rounded-2xl p-4">
                      <p className="text-sm text-green-700">
                        Biomassa
                      </p>

                      <h3 className="text-2xl font-bold mt-2 text-green-700">
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