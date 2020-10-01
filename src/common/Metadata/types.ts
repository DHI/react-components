/**
 * Metadata base structure.
 */
interface MetadataBase {
  /**
   * Metadata Input Key
   */
  key: string;
  /**
   * Metadata Input label
   */
  label: string;
  /**
   * Metadata Input type
   * @param  'SingleChoice' | 'MultiChoice' | 'Text' | 'Boolean' | 'MultiText';
   */
  type: 'SingleChoice' | 'MultiChoice' | 'Text' | 'Boolean' | 'MultiText';
}

/**
 * New type to accommodate the default field types.
 */
type MetadataDefault = string | boolean | string[];

interface Metadata extends MetadataBase {
  /**
   * Optional field, used on MultiChoice and/or SingleChoice
   */
  options?: string[];
  /**
   * The Default value is the field is left empty
   */
  default: MetadataDefault;
  /**
   * Regex params to validate the TextInput Fields
   * @param regEx example: '[a-zA-Z]*:'
   */
  regEx?: string;
  /**
   * Error message accordly with the @param regEx
   */
  regExError?: string;
}
