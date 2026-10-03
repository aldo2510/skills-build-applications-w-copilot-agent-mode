function formatValue(value) {
  if (value === null || value === undefined || value === '') {
    return '—'
  }
  if (Array.isArray(value)) {
    return value.length ? value.join(', ') : '—'
  }
  if (typeof value === 'object') {
    return value.name ?? value._id ?? JSON.stringify(value)
  }
  return String(value)
}

export default function CollectionPage({
  title,
  description,
  columns,
  records,
  loading,
  error,
}) {
  return (
    <section>
      <div className="page-heading mb-4">
        <p className="eyebrow">OCTOFIT TRACKER</p>
        <h1>{title}</h1>
        <p className="text-secondary">{description}</p>
      </div>

      {loading && (
        <div className="alert alert-info" role="status">
          Loading {title.toLowerCase()}…
        </div>
      )}
      {error && (
        <div className="alert alert-danger" role="alert">
          Could not load {title.toLowerCase()}: {error}
        </div>
      )}
      {!loading && !error && records.length === 0 && (
        <div className="alert alert-light border" role="status">
          No {title.toLowerCase()} to display yet.
        </div>
      )}
      {!loading && !error && records.length > 0 && (
        <div className="card collection-card">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  {columns.map(({ label }) => (
                    <th scope="col" key={label}>
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record._id ?? record.id ?? index}>
                    {columns.map(({ key, render }) => (
                      <td key={key}>
                        {render ? render(record[key], record) : formatValue(record[key])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  )
}
