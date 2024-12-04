declare module "*.png";
declare module "*.jpg";
declare module "*.mp4";
declare module "*.webm";
declare module "*.html" {
  const content: string;

  export default content;
}
