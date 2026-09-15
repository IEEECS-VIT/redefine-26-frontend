import NextImage, { type ImageProps } from "next/image";

export default function Image({ priority, loading, ...props }: ImageProps) {
  if (priority) {
    return <NextImage priority {...props} />;
  }
  return <NextImage loading={loading ?? "eager"} {...props} />;
}
