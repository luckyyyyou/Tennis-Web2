export default function NewsDetail({
  params,
}: {
  params: { id: string }
}) {
  // 根据params.id获取新闻详情
  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">新闻标题</h1>
      <div className="prose dark:prose-invert">
        {/* 新闻内容 */}
      </div>
    </div>
  )
} 