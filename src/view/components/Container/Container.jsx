import'./Container.css'
export const Container = ({ children }) => {
    return (
        <section className='container'>
            {children}
        </section>
    )
}