import NavigationMain from './components/NavigationMain'
import DocumentPaper from './components/DocumentPaper'
import LogoutButton from './components/LogoutButton'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFCF9]" data-component="home-container">
      <header data-component="home-header">
        <div className="flex justify-end p-3 md:p-5 lg:p-7" data-component="logout-container">
          <LogoutButton />
        </div>
      </header>
      
      <div className="flex justify-center items-center" data-component="main-content">
        <NavigationMain />
        <main data-component="document-container">
          <DocumentPaper />
        </main>
      </div>

      <footer className="border-t border-gray-200" data-component="home-footer" />
    </div>
  )
}

