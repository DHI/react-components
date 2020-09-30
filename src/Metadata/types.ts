interface MetadataBase {
  key: string;
  label: string;
  type: 'SingleChoice' | 'MultiChoice' | 'Text' | 'Boolean' | 'MultiText';
}

type MetadataDefault = string | boolean | string[];

interface Metadata extends MetadataBase {
  options?: string[];
  default: MetadataDefault;
  regEx?: string;
  regExError?: string;
}
