async function paginatedResults({
  model,
  page = 1,
  limit = 10,
  filter = {},
  sort = {},
  populate = ""
}) {
  page = Math.max(parseInt(page) || 1, 1);
  limit = Math.max(parseInt(limit) || 10, 1);

  const skip = (page - 1) * limit;

  const total = await model.countDocuments(filter);

  let query = model.find(filter).sort(sort).skip(skip).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  const data = await query;

  const results = {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
    count: data.length,
    data
  };

  if (page < results.totalPages) {
    results.next = {
      page: page + 1,
      limit
    };
  }

  if (page > 1) {
    results.previous = {
      page: page - 1,
      limit
    };
  }

  return results;
}

module.exports = paginatedResults;