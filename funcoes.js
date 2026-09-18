// --- CONFIGURAÇÃO DO SUPABASE COM SUAS CHAVES ---
const SUPABASE_URL = 'https://legfoltyfnypowhnscwe.supabase.co'
const SUPABASE_ANON_KEY = 'sb_publishable_BJ7VdB4lwxbrSoQa-hFDXw_XdOIkk-r'

// Inicializa a conexão com o Supabase
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// --- MÉTODOS PARA EQUIPAMENTOS ---

// Buscar e exibir os equipamentos salvos no banco de dados
async function carregarEquipamentos() {
  const { data: equipamentos, error } = await supabase
    .from('equipamentos')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    console.error('Erro ao buscar equipamentos:', error)
    return
  }

  const tabelaBody = document.getElementById('tabela-equipamentos')
  if (!tabelaBody) return

  tabelaBody.innerHTML = '' // Limpa a tabela antes de desenhar os itens

  equipamentos.forEach(eq => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${eq.patrimonio}</td>
      <td>${eq.tipo}</td>
      <td>${eq.marca_modelo}</td>
      <td>${eq.setor}</td>
      <td>${eq.responsavel}</td>
      <td>${eq.status}</td>
    `
    tabelaBody.appendChild(tr)
  })
}

// Salvar um novo equipamento no banco de dados
async function salvarEquipamento(event) {
  event.preventDefault()

  const patrimonio = document.getElementById('eq-patrimonio').value
  const tipo = document.getElementById('eq-tipo').value
  const marcaModelo = document.getElementById('eq-marca').value
  const setor = document.getElementById('eq-setor').value
  const responsavel = document.getElementById('eq-responsavel').value
  const status = document.getElementById('eq-status').value

  const { data, error } = await supabase
    .from('equipamentos')
    .insert([
      {
        patrimonio: patrimonio,
        tipo: tipo,
        marca_modelo: marcaModelo,
        setor: setor,
        responsavel: responsavel,
        status: status
      }
    ])

  if (error) {
    alert('Erro ao cadastrar equipamento: ' + error.message)
    console.error(error)
  } else {
    alert('Equipamento cadastrado com sucesso!')
    document.getElementById('form-equipamento').reset()
    carregarEquipamentos() // Recarrega a tabela com o item novo
  }
}

// --- MÉTODOS PARA CHAMADOS ---

// Buscar e exibir os chamados salvos no banco de dados
async function carregarChamados() {
  const { data: chamados, error } = await supabase
    .from('chamados')
    .select('*')
    .order('id', { ascending: false })

  if (error) {
    console.error('Erro ao buscar chamados:', error)
    return
  }

  const tabelaBody = document.getElementById('tabela-chamados')
  if (!tabelaBody) return

  tabelaBody.innerHTML = '' // Limpa a tabela antes de desenhar os itens

  chamados.forEach(ch => {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>#${ch.id}</td>
      <td>${ch.solicitante}</td>
      <td>${ch.categoria}</td>
      <td>${ch.descricao}</td>
      <td>${ch.prioridade}</td>
      <td>${ch.status}</td>
    `
    tabelaBody.appendChild(tr)
  })
}

// Salvar um novo chamado no banco de dados
async function salvarChamado(event) {
  event.preventDefault()

  const solicitante = document.getElementById('ch-solicitante').value
  const categoria = document.getElementById('ch-categoria').value
  const descricao = document.getElementById('ch-descricao').value
  const prioridade = document.getElementById('ch-prioridade').value

  const { data, error } = await supabase
    .from('chamados')
    .insert([
      {
        solicitante: solicitante,
        categoria: categoria,
        descricao: descricao,
        prioridade: prioridade,
        status: 'Aberto'
      }
    ])

  if (error) {
    alert('Erro ao criar chamado: ' + error.message)
    console.error(error)
  } else {
    alert('Chamado criado com sucesso!')
    document.getElementById('form-chamado').reset()
    carregarChamados() // Recarrega a tabela com o item novo
  }
}

// --- EVENTOS QUE EXECUTAM QUANDO A PÁGINA CARREGA ---
document.addEventListener('DOMContentLoaded', () => {
  // Carrega os dados existentes no Supabase
  carregarEquipamentos()
  carregarChamados()

  // Conecta os formulários às funções de salvar
  const formEq = document.getElementById('form-equipamento')
  if (formEq) formEq.addEventListener('submit', salvarEquipamento)

  const formCh = document.getElementById('form-chamado')
  if (formCh) formCh.addEventListener('submit', salvarChamado)
})
