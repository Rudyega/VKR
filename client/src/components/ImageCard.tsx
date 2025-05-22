

type ImageCardProps = {
  url: string;
  title: string;
  author: string;
};

export function ImageCard({ url, title, author }: ImageCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden shadow-md bg-[#f5e1c9]">
      <img src={url} alt={title} className="w-full h-60 object-cover" />
      <div className="p-4 text-[#3a2e1c]">
        <h3 className="text-lg font-semibold truncate">{title}</h3>
        <p className="text-sm text-[#5e4a32]">Автор: {author}</p>
      </div>
    </div>
  );
}
