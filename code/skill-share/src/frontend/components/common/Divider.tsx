export default function Divider({ length } : { length:number, padding?:number }) {
    return (
        <hr style={{ width: `${length}%`}} />
    );
}