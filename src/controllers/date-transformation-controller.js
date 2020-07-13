const mondayService = require('../services/monday-service');
const transformationService = require('../services/transformation-service');
const API_TOKEN = process.env.API_TOKEN;

async function transformToMondayColumn(req, res) {
  const { payload } = req.body;
  const { inboundFieldValues } = payload;
  const { boardId, itemId, sourceColumnId, formulaColumnId, targetColumnId } = inboundFieldValues;
  const token = API_TOKEN;
  const { date, formula } = await mondayService.getColumnValue(token, itemId, sourceColumnId, formulaColumnId);

  if (!(date && formula)) {
    return res.status(200).send({});
  }
  const transformedDate = await transformationService.transformDate(date, formula);

  await mondayService.changeColumnValue(token, boardId, itemId, targetColumnId, transformedDate);

  return res.status(200).send({});
}
module.exports = {
  transformToMondayColumn,
};
