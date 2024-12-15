import NavigationMain from './components/NavigationMain'
import DocumentPaper from './components/DocumentPaper'
import LogoutButton from './components/LogoutButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFCF9] pb-16 flex flex-col">
      <div className="fixed top-0 w-full z-50 flex justify-end p-4 md:p-6 bg-[#FFFCF9] md:bg-transparent">
        <LogoutButton />
      </div>
      <div className="flex flex-1">
        <NavigationMain />
        <main className="flex-1 mt-16 md:mt-[92px] px-4 md:px-8 lg:px-16">
          <DocumentPaper />
        </main>
      </div>
    </div>
  )
}

