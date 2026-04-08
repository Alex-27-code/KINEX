#!/bin/bash
# Download all 80 exercise GIF files from Google Drive
DIR="/root/.openclaw/workspace/kinex-web/public/gifs"

download_file() {
    local filename="$1"
    local file_id="$2"
    local url="https://drive.google.com/uc?export=download&id=${file_id}"
    local out="${DIR}/${filename}"
    
    if [ -f "$out" ]; then
        echo "SKIP: $filename (exists)"
        return 0
    fi
    
    local result=$(curl -L -s -o "$out" -w "%{http_code}" "$url" 2>/dev/null)
    if [ "$result" = "200" ] || [ "$result" = "303" ]; then
        # Check if file is valid (not error page)
        local size=$(stat -c%s "$out" 2>/dev/null || echo "0")
        if [ "$size" -gt 10000 ]; then
            echo "OK: $filename (${size}B)"
        else
            echo "FAIL: $filename (too small: ${size}B)"
            rm -f "$out"
        fi
    else
        echo "FAIL: $filename (HTTP $result)"
        rm -f "$out"
    fi
}

# Batch download - first 20
echo "=== Batch 1 (1-20) ==="
download_file "arnold-press.webp" "1ydL60Cq7Qy0p8t7PqJZFPs41NqVaS7CS"
download_file "back-extension-frontloaded.webp" "1647zHttV25C9rqpCKGAgcZJxnMznMTX7"
download_file "Barbell-biceps-curl.webp" "1sQnEufhh4sQIiNrrCuijoAa-UoU0ZoPq"
download_file "Barbell-Hack-Squat-Exercise.webp" "1k9LWOiLdn5P8NyhGCkB75F-m1PIS_n3Y"
download_file "Barbell-Lunge.webp" "1ZM3LhAUGSfgNzQ5nd90UvNmKso_pHC58"
download_file "Barbell-Lying-Tricep-Extension.webp" "1SIP12a4GCRKQDYFexS30T5vdA1zSjS6P"
download_file "Barbell-Row.gif" "1vp1uaWJjCelsCAQWA85zzcKSFpkDkQNr"
download_file "Barbell-Shrug.webp" "1ZHGm4FLvngd2JAj_0OE_zuBtoivHk0p6"
download_file "barbell-standing-calf-raise-2.webp" "1uziwKUq6qi80tVZfofIlR3MOSpgsK-oK"
download_file "Barbell-Standing-Triceps-Extension.webp" "1M3hPaksWE46aZci2mY7SKDQ6IAqQmxd1"
download_file "belt-squat.webp" "1qZEgp8ifrEkYL9v3oxHG3RfDAlrQzm8D"
download_file "bench-press.webp" "1zrMr77wDVBOuer7mfHDyWUKmgXxYBLTV"
download_file "Bulgarian-split-squat-barbell.webp" "1oiC0yrJLvDgeSCAkc-k5ybRwWHWJQBSd"
download_file "cable-chest-press.webp" "1Ib6pXylaVdy6AFSsNADbm_lpWOTIOccR"
download_file "cable-crunch.webp" "15vdZHZ_L_F3M5XcdgJFehBshZxUTCw5l"
download_file "cable-curl-with-bar.webp" "1ZZnKhURwIleYT6jg0WHZzXGfotqoIc1m"
download_file "cable-curl-with-rope.webp" "1F46rAD8XkaxHNOE1ZbYmt8ZFu8a6o5SY"
download_file "cable-front-raise.webp" "1qJXJQbMCKAn-Gs4Fn88YNjROepZw7_40"
download_file "cable-lateral-raise.webp" "1TJ9mAvV9SL-Ao9a_jYdeI5PFjYoeBfzG"
download_file "cable-rear-delt-row.webp" "12CQ8_axtbQD5v14KTi46Sow3SPpOZ-sW"

echo "=== Batch 2 (21-40) ==="
download_file "cable-row-seated-narrow-grip.webp" "1_E6Uwi1ljBUEcFMHxMZReQrhFTw1kgPQ"
download_file "cable-row-seated-single-arm.webp" "17zgjSAvS22ypBD1yxpodaRKlXq3ipTKo"
download_file "calf-raise-standing.webp" "1l6PLhOWoPXsDQzvolb6NF93UlJlhowV_"
download_file "Close-grip-bench-press.webp" "1ZCUtxQK2a5LSB8Ew6_oLGK5lGlX7VDW_"
download_file "Crossbody-Cable-Triceps-Extension.webp" "1-KPbnc18xtd0UDfV11y0IviiNZfKEdzW"
download_file "Crunch.webp" "16dIXI6xVsKyDLKyAWJP3Qa2IUgyU00dr"
download_file "Deadlift.webp" "1U7XyOcrPcUeWSfxGB1ejqIXiaLYVcRFh"
download_file "Dips.webp" "1tgRVg7l_3vdovg383usjS04VJjyhojFM"
download_file "Dumbbell-Chest-Fly.webp" "1_TYwHW5ePfNuCDhKTDbgNuVFSzE8JcqL"
download_file "Dumbbell-Chest-Press.webp" "1sHSdiZptQgRSdrEdwGDnzsZkbpy1S-cZ"
download_file "Dumbbell-Front-Raise.webp" "1UOTbg6w7AfVcrIAsWIZtBzjMnL7oJX0I"
download_file "Dumbbell-Incline-Press.webp" "1PaWBhPJ5HN1nMr7Lg2w-1wfaRGQwQZ32"
download_file "Dumbbell-Lateral-Raise.webp" "1ski69J4bYkQGb1LP710ITbTtC5d-Kk2m"
download_file "Dumbbell-Lunge.webp" "1G7UVjxaCb2muRRD5XkVrE0Jgc8M_xs3T"
download_file "Dumbbell-Pullover.webp" "11sGvdTluZp8MCoiPBPDC8tmRDpMfV8wl"
download_file "EZ-curl.webp" "1VnMdGpFhdjcnwzdSqkz5aloN_onCw37w"
download_file "Front-squat.webp" "1bSYhmpWd6jixQhxkRHHK4p_BMYLWXyYI"
download_file "hack-squat-machine.gif" "1-x7xAzNv_ENDtvdY_Mtm9uOCMS9Ts4iN"
download_file "Hammer-curl.webp" "1WamS-wKp9bAaYJnIxhWP9LJgTPn4TS90"
download_file "hanging-leg-raise.webp" "1JHDem1zEt9W-leHhh7GIy4Dq8eQ0fBn0"

echo "=== Batch 3 (41-60) ==="
download_file "Hip-thrust.webp" "1JgEWkEO6t0yVupii9rn-uFc9lQE1FN6P"
download_file "Incline-Bench-Press.webp" "12a0GmneTTEbw42AIWhLsS3YvaS5YjaAH"
download_file "Incline-Bench-SkullCrushers.webp" "1J6XCP-xN1MYOTCUTJjy2hPc7LGKuKW0u"
download_file "Incline-Dumbbell-Curl.webp" "1fmmBtTPNTy37HGMdh8XZQIrIrhGRyRci"
download_file "kroc-row.webp" "1yLUTw9C4rBGSYozpIGVopN7mmTu9Zj39"
download_file "lat-pulldown-with-neutral-grip-1.webp" "1b1DPAtOMlY7ILsfJ9ySI1tsHBsybTZBq"
download_file "lateral-raise-machine.webp" "1wKsMLtmAH_caR4Glclf5KfYH4b2in7Ea"
download_file "leg-curl-seated.webp" "1GyH_wbgDYMQZut8p9haeYzmE297P70Lj"
download_file "leg-extension-one-leg.webp" "1xETvUkiePRF22eIIH_JDbJCqFYBhCpfG"
download_file "leg-extension-seated.webp" "1lBZI4RMdY685VKkx2nkVY5orHUJzbCT7"
download_file "leg-press.webp" "1DPvO99HDCAa2LxY590pQk7HbbpIs7oRm"
download_file "Machine-Chest-Fly.webp" "19J8J6LzNBDNuf5ZwEhyZxC3KC34C-eTA"
download_file "Machine-Chest-Press.webp" "1tGkeumjYKQvNchXKfJdOPz82_6wLoMNE"
download_file "Machine-Lat-Pulldown.webp" "1i_O3I97AYm4wCijIKBF0eBd6Q-xZr18x"
download_file "Machine-Overhead-Tricep-Extension.webp" "1djLbJbQv6DT2tCH_U1cOzkxszLdvmzPx"
download_file "Machine-Shoulder-Press.webp" "1BY2evFDLAkSPXt2CiZZDUSb-ozw3aG2N"
download_file "one-arm-lat-pulldown.webp" "1vNfcWOqefWAq2VTJUz7ZEXIzV3E4xW5V"
download_file "Overhead-Cable-Triceps-Extension-Upper-Position.webp" "10AdYiGiJN2bjGUgkLDyb-5wawrPXiAby"
download_file "Overhead-Press-Exercise.webp" "19rkF16Y1x69e3CVh7XCkskVRXwVZ0L04"
download_file "Overhead-Tricep-Extension-Lower-Position.webp" "1-IL2PU5Rx4ySCKoIzDGGs4F12oWqShlX"

echo "=== Batch 4 (61-80) ==="
download_file "Pec-Deck.webp" "1MEEKGeZhgOqm3DdmG2o4-K7qfQavKKzb"
download_file "Preacher-Curl-Barbell.webp" "1li6wB8Cs8bmJSnRYNPkRLwAmpIAiglo-"
download_file "Pull-Ups.webp" "18QGaEpZcVKlMy9UTi7YjBF7QPwCP4bqQ"
download_file "Push-Press.webp" "1Ws7M32fvqUiDdgH2zA8oyj21db5fwld7"
download_file "Push-Up.webp" "1sqb2De_ftDWfuV0VhM34zJPRIkMp_2N9"
download_file "Reverse-Dumbbell-Flyes.webp" "1UJdFkmt-YhVLf2cCHGjOUU9XjowSGKdg"
download_file "Reverse-Machine-Fly.webp" "1P3vcgADV--ig8ox8OSi-pam16IHFRnDi"
download_file "Romanian-Deadlift.webp" "1p94tg1OMX3oKhUVK8yy_0FnozQlEHrQG"
download_file "Seated-Calef-Raise-Barbell.webp" "16O44K6prRvad4VhtDWpfn1i7i3a9yxOC"
download_file "Seated-Dumbbell-Shoulder-Press.webp" "1zkTG-nOIMQhBV9yx3tnyA6TMjYSmDqn2"
download_file "Seated-Machine-Row.webp" "1sY5ZAdCPoCJKxS5yf0XcFWm4gEE_7pBE"
download_file "single-leg-leg-curl.webp" "1nYfdo3FQKQ_dIFRoJkk1zzDgRvvF7_Kq"
download_file "Smith-Machine-Lunge.webp" "18VdmJ2et7JoX76Xgi1NdBsL-TuXmzNqx"
download_file "Spider-Curl-2.webp" "1ZGllS9jh_UjXnWBe_yQdBPt4ORXRF1dj"
download_file "squat.webp" "1QE7pMycmg69yvw5lJdlLlX8MjMB77snN"
download_file "T-Bar-Row-Machine.webp" "1A0z-Rk17d2IBxyPTi_u-U_kuHUAlJMjb"
download_file "triceps-pushdown-with-rope.webp" "18MAKWqOlD7COEdVltO-v_XVuVCVFugVi"
download_file "triceps-pushdown-with-straight-handle.webp" "1VX9Lnrx-WufwKck32rHt5QHvvk1duTvd"

echo ""
echo "=== DONE ==="
ls "$DIR" | wc -l
ls "$DIR" | head -20