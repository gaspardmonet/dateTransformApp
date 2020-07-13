require('datejs');
class TransformationService {
  static async transformDate(date, formula) {
    const addDays = Math.round(JSON.parse(formula)) + 1;
    const dueDate = Date.parse(JSON.parse(date).date).addDays(addDays).toISOString().split('T');
    return dueDate[0];
  }

  static async changeColumnValue(token, boardId, itemId, columnId, value) {
    try {
      const mondayClient = initMondayClient({ token });

      const query = `mutation change_column_value($boardId: Int!, $itemId: Int!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
      const variables = { boardId, columnId, itemId, value };

      const response = await mondayClient.api(query, { variables });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = TransformationService;
