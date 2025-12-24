if(NOT TARGET hermes-engine::libhermes)
add_library(hermes-engine::libhermes SHARED IMPORTED)
set_target_properties(hermes-engine::libhermes PROPERTIES
    IMPORTED_LOCATION "/Users/rajanmalakar/.gradle/caches/8.13/transforms/72a6fefc45f5671f19fbc80515820625/transformed/hermes-android-0.79.5-release/prefab/modules/libhermes/libs/android.x86_64/libhermes.so"
    INTERFACE_INCLUDE_DIRECTORIES "/Users/rajanmalakar/.gradle/caches/8.13/transforms/72a6fefc45f5671f19fbc80515820625/transformed/hermes-android-0.79.5-release/prefab/modules/libhermes/include"
    INTERFACE_LINK_LIBRARIES ""
)
endif()

