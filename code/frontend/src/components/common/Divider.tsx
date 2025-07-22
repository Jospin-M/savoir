export default function Divider({ length } : { length:number }) {
    return (
        <hr style={{ width: `${length}%`}} />
    );
}