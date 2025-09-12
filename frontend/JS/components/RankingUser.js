export function renderUserRow(usuario) {
  return `
    <tr id="usuario-${usuario.id}">
      <td>
        <img src="https://flagsapi.com/${usuario.country_code.toUpperCase()}/shiny/64.png">
      </td>
      <td>${usuario.nick_name}</td>
      <td>${usuario.score}</td>
      <td>
        <button class="btn btn-danger btn-sm eliminar-btn" data-id="${usuario.id}">
          Eliminar
        </button>
      </td>
    </tr>
  `;
}
