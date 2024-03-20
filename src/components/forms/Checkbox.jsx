/**
 * 
 * @param {bool} checked 
 * @param {(s: string) => void } onChange 
 * @param {string} label 
 * @param {string} id
 */
export function Checkbox ({checked, onChange, label, id})
{
    return <div className="form-check mt-2">
        <input type="checkbox"
            className="form-check-input"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            id={id} />
            <label htmlFor={id} className="form-check-label">{label}</label>
    </div>
}