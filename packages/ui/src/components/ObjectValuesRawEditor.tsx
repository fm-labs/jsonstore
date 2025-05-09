import React from 'react'

export interface ObjectValuesRawEditorProps {
  namespace: string
  initialValues: object //Record<string, string>
  onUpdate?: (values: any) => void
}

export const ObjectValuesRawEditor = ({
  namespace,
  initialValues,
  onUpdate,
}: ObjectValuesRawEditorProps) => {
  const [text, setText] = React.useState('')

  const handleUpdateClick = () => {
    // Parse the text into a JSON object
    let values
    try {
      values = JSON.parse(text)
    } catch (e) {
      alert('Invalid JSON')
      return
    }

    // Call the onUpdate function
    if (onUpdate) {
      onUpdate(values)
    }
  }

  React.useEffect(() => {
    if (initialValues) {
      setText(JSON.stringify(initialValues, null, 2))
    }
  }, [initialValues])

  return (
    <div>
      <textarea
        value={text}
        style={{ width: '100%' }}
        rows={10}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleUpdateClick}>Update</button>
    </div>
  )
}
