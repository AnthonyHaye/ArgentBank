/**
 * @file Composant Input réutilisable.
 * Gère les champs de formulaire de différents types, y compris les cases à cocher.
 */

import PropTypes from 'prop-types';

/**
 * Composant de champ de saisie personnalisé.
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.id - Identifiant unique du champ de saisie.
 * @param {string} props.label - Libellé du champ de saisie.
 * @param {string} props.type - Type d'entrée (ex: "text", "password", "checkbox").
 * @param {boolean} [props.checked] - État coché (uniquement pour les cases à cocher).
 * @param {function} [props.onChange] - Fonction appelée lors d'une modification de valeur.
 * @param {string} [props.value] - Valeur de l'entrée (non applicable pour les cases à cocher).
 * @param {string} [props.autoComplete] - Attribut autoComplete pour l'autocomplétion du champ.
 * @param {string} [props.placeholder] - Texte indicatif dans le champ de saisie.
 * @returns {JSX.Element} - Élément JSX représentant un champ de formulaire.
 */
const Input = ({
  id,
  label,
  type,
  checked,
  onChange,
  value,
  autoComplete,
  placeholder,
}) => {
  const inputClass = type === 'checkbox' ? 'input-remember' : 'input-wrapper';

  return (
    <div className={inputClass}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        checked={type === 'checkbox' ? checked : undefined}
        value={type !== 'checkbox' ? value : undefined}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
    </div>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  autoComplete: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
