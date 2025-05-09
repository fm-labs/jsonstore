import $RefParser from '@apidevtools/json-schema-ref-parser'

export const compileSchema = async (mySchema: any) => {
  try {
    //return await $RefParser.dereference(mySchema)
    // note - by default, mySchema is modified in place, and the returned value is a reference to the same object
    // console.log(mySchema.definitions.person.properties.firstName)

    // if you want to avoid modifying the original schema, you can disable the `mutateInputSchema` option
    return await $RefParser.dereference(mySchema, {
      mutateInputSchema: true,
      dereference: { circular: false },
    })
  } catch (err) {
    console.error(err)
    throw new Error('Failed to dereference schema')
  }
}
