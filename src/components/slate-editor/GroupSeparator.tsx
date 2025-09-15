export default function GroupSeparator() {
    return (
        <div
            style={{
                display: 'grid',
                placeItems: 'center',
                paddingLeft: 8,
                paddingRight: 8,
                color: 'var(--theme-elevation-300)'
            }}
        >
            &#124;
        </div>
    );
}
